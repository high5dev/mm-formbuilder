const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generateTokens = require("../Utilities/generateToken");
const { User, Authenticate,DefaultElement,ContactType,Organization } = require("../models/index/index");
const tokenGenerate = require("../Utilities/generateToken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, parseInt(10, 10));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const user = tokenGenerate(newUser);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ errors: { common: { msg: "Internal server error!" } } });
  }
};

const getUserList = async (req, res) => {
  try {
    User.find()
      .populate("userId")
      .exec((err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          res.send({ data, success: true });
        }
      });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userInfo = await User.find({});
    if (userInfo.length) {
      return res.status(200).json({ success: true, data: userInfo });
    }
    return res.status(404).json({ success: false, message: `User info is empty!` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const Obj = req.body;

    ["userId", "_id"].map((el) => delete Obj[el]);
    const data = await User.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId) }, Obj);
    if (Obj.phone) {
      await Authenticate.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { phone: Obj.phone });
    }
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `User not found` });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const userDetailsByUserId = async (req, res) => {
  try {
    const { _id } = req.user;
    const userDetails = await User.find({ userId: _id });
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const userDetails = await User.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $lookup: {
          from: "auths",
          localField: "userId",
          foreignField: "_id",
          as: "auths",
        },
      },
    ]);
    return res.status(200).send(userDetails[0]);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getOrgAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const userDetails = await User.aggregate([
      {
        $match: {
          "organizations.organizationId": mongoose.Types.ObjectId(id),
        },
      },
      {
        $match: {
          "organizations.userType": "admin",
        },
      },
      {
        $lookup: {
          from: "auths",
          localField: "userId",
          foreignField: "_id",
          as: "auths",
        },
      },
      {
        $unwind: {
          path: "$auths",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "auths.hashed_password": 0,
          __v: 0,
          "auths.__v": 0,
        },
      },
    ]);
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Authenticate.findById(mongoose.Types.ObjectId(id));
    const userData = await User.findOne({ userId: user._id }).populate({
      path: "roles.contactTypeId",
      model: ContactType,
    });
    let isActive = true;
    let elements = await DefaultElement.find({});
    let permissions = [];
    for (const elem of elements) {
      permissions.push({
        defaultId: elem.id,
        elementTitle: elem.elementTitle,
        elementParent: elem.elementParent,
        navLink: elem.navLink,
        //locationIds: [],
        read: true,
        write: true,
        update: true,
        delete: true,
      });
    }
    const userPlan = {
      name: "",
      icon: "",
      description: "",
      benefits: [],
      pricePerMonth: 0,
      pricePerYear: 0,
      currency: "USD",
      type: "business",
      trialTime: 0,
      permissions: permissions,
      isDefault: false,
      isDeleted: false,
      payByUser: false,
    };
    isActive = userData?.isActive;
    if (!isActive) {
      return res.status(401).json({
        msg: "Your account has been compromised. Please contact support.",
      });
    }

    const asynGenerateToken = async () => {
      let userId = user._id;
      const userInfo = {
        type: user.userType,
        employeeId: null,
      };

      const { accessToken, refreshToken } = await generateTokens({
        _id: userId,
        user: userInfo,
      });

      // Temprary count as User
      const data = await User.findOne({ userId: user._id });

      // eslint-disable-next-line no-unused-vars

      fullName = `${data.firstName} ${data.lastName}`;

      // const userData = await User.findOne({ userId: user._id });
      let orgIds = [],
        organizations = [];
      if (userData?.organizations?.length) {
        for (const org of userData.organizations) {
          orgIds.push(org.organizationId);
        }
        const userOrgs = await Organization.find({ _id: { $in: orgIds } });

        for (const o of userOrgs) {
          organizations.push({
            id: o._id,
            name: o.name,
            path: o.path,
            userType: userData.organizations.find((x) => x.organizationId.equals(o._id))
              ?.userType,
          });
        }
      }

      let roles = [];
      let locs = [];
      if (userData?.roles?.length) {
        const oIds = userData?.roles.map(x=>x.organizationId)
        const rolOrgs = await Organization.find({ _id: { $in: oIds } });
        let assignerIds = userData?.roles.map((x) => mongoose.Types.ObjectId(x.assignerId));
        locs = await User.find({ userId: { $in: assignerIds } });
        for (const r of userData?.roles) {
          const assigner = locs.find((x) => x.userId.equals(r.assignerId));
          roles.push({
            organizationId: r.organizationId,
            organizationName:rolOrgs.find(x=>x._id.equals(r.organizationId)).name,
            orgPath:rolOrgs.find(x=>x._id.equals(r.organizationId)).path,
            contactTypeId: r.contactTypeId,
            assignerId: r.assignerId,
            assignerName:`${assigner.firstName} ${assigner.lastName}`,
            contactId: r.contactId,
            locationName: assigner?.organizations?.find((x) =>
              x.organizationId.equals(r.organizationId)
            )?.locationName,
          });
        }
      }

      return res.json({
        userData: {
          id: user._id,
          fullName: `${userData.firstName} ${userData.lastName == "_" ? "" : userData.lastName}`,
          organizations: organizations || null,
          username: "",
          avatar: "",
          email:user.email,
          phone: user.phone,
          position: user.position,
          userType: user.userType,
          roles: roles || null,
          plan: userPlan,
          extras: {
            eCommerceCartItemsCount: "",
          },
        },
        accessToken,
        refreshToken,
      });
    };

    asynGenerateToken();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const updateLocationName = async (req, res) => {
  try {
    let { locationName, organizationId, userId } = req.body;
    const data = await User.findOneAndUpdate(
      {
        userId: mongoose.Types.ObjectId(userId),
        "organizations.organizationId": mongoose.Types.ObjectId(organizationId),
      },
      { $set: { "organizations.$.locationName": locationName } }
    );
    console.log(userId);
    console.log(organizationId);
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const deactiveUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { userId: _id },
      { $set: { isActive: false } },
      { new: true, runValidators: true }
    );
    if (user) {
      return res.status(200).json({ data: user, success: true });
    }
    return res.status(403).json({ message: "unable deactive user", success: false });
  } catch (err) {
    console.log(err);
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

module.exports = {
  signup,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
  getUserList,
  getOrgAdmin,
  deactiveUser,
  updateLocationName,
  getSuperAdmin
};
