/* eslint-disable consistent-return */
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// eslint-disable-next-line
const { faker } = require("@faker-js/faker");

const asyncHandler = require("express-async-handler");
// eslint-disable-next-line object-curly-newline
const {
  Authenticate,
  Temp,
  User,
  Organization,
  ResetPass,
  Roles,
  Contact,
  SubscriptionBought,
  SubscriptionPlan,
  DefaultElement,
  ContactType,
  UserToken,
} = require("../models/index/index");
const generateTokens = require("../Utilities/generateToken");
const { generateOTP, sendEmailVerification, phoneOtpSend } = require("../Utilities/generateOTP");

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// @desc Create a New Account/User
// @route POST /{prefix}/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, phoneOrEmail, password, otp } = req.body;
  let phone = "";
  let email = "";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
  } else {
    email = phoneOrEmail;
  }
  const hashedPassword = (await hashPass(password)).toString();

  Temp.findOne({ phoneOrEmail, otp }, (err, user) => {
    if (err) {
      return res.status(500).json({ errors: { common: { msg: err.message } } });
    }
    if (!user) {
      return res.status(401).json({ errors: { common: { msg: "Invalid OTP" } } });
    }
    // eslint-disable-next-line no-shadow
    Authenticate.findOne({ email, phone }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }

      if (user) {
        return res.status(409).json({
          errors: {
            common: { msg: "Email or Phone Number Already Taken" },
          },
        });
      }
      const newAuth = new Authenticate({
        email,
        phone,
        hashed_password: hashedPassword,
        userType: "user",
      });

      const newUser = new User({
        userId: newAuth._id,
        firstName,
        lastName,
      });

      // eslint-disable-next-line no-shadow
      newUser.save((err) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }
      });

      // eslint-disable-next-line no-shadow
      newAuth.save((err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }

        if (success) {
          // eslint-disable-next-line no-shadow
          Temp.findOneAndDelete({ phoneOrEmail, otp }, (err, success) => {
            if (err) {
              // eslint-disable-next-line no-unused-vars, no-shadow
              Authenticate.findOneAndDelete({ email, phone }, (err, success) => {
                if (err) {
                  return res.status(500).json({
                    errors: { common: { msg: err.message } },
                  });
                }
              });
            } else if (success) {
              const asynGenerateToken = async () => {
                const { accessToken, refreshToken } = await generateTokens({
                  _id: newAuth._id,
                });

                return res.json({
                  userData: {
                    id: newAuth._id,
                    fullName: `${firstName} ${lastName}`,
                    username: "",
                    avatar: "",
                    email,
                    role: "",
                    ability: [
                      {
                        action: "",
                        subject: "",
                      },
                    ],
                    extras: {
                      eCommerceCartItemsCount: "",
                    },
                  },
                  accessToken,
                  refreshToken,
                });
              };

              asynGenerateToken();
            }
          });
        }
      });
    });
  });
});

exports.signUpOrg = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // eslint-disable-next-line object-curly-newline
    const { firstName, lastName, phoneOrEmail, password, otp } = req.body;
    const { organization } = req.params;

    let orgData;
    let ifFirstOrgUser;
    if (organization) {
      orgData = await Organization.findOne({ path: organization });
      ifFirstOrgUser = await User.findOne({ "organizations.organizationId": orgData._id });
    }

    let phone = "";
    let email = "";

    if (phoneOrEmail.indexOf("@") === -1) {
      phone = phoneOrEmail;
    } else {
      email = phoneOrEmail;
    }
    const hashedPassword = (await hashPass(password)).toString();
    const tempUser = await Temp.findOne({ phoneOrEmail, otp });
    if (!tempUser) {
      return res.status(401).json({ errors: { common: { msg: "Invalid OTP" } } });
    }
    const authUser = await Authenticate.findOne({ email, phone });
    let newAuth = {};
    if (authUser !== null) {
      //add organization
      const user = await User.findOne({ userId: mongoose.Types.ObjectId(authUser._id) });
      let organizations = [];
      if (organization && orgData) {
        if (user.organizations) {
          const orgExists = user.organizations.filter((x) => x.organizationId.equals(orgData._id));
          if (orgExists.length === 0) {
            organizations = user.organizations
              ? [
                  ...user.organizations,
                  {
                    organizationId: orgData._id,
                    userType: ifFirstOrgUser === null ? "admin" : "user",
                  },
                ]
              : [
                  {
                    organizationId: orgData._id,
                    userType: ifFirstOrgUser === null ? "admin" : "user",
                  },
                ];
            //await Organization.findOneAndUpdate({ _id: orgData._id }, { isVerified: true });
            await User.findOneAndUpdate({ _id: user._id }, { organizations: organizations });
          } else {
            return res.status(409).json({
              errors: {
                common: {
                  msg: "You already signedup under this organization. Please Login to access!",
                },
              },
            });
          }
        }
      } else {
        return res
          .status(409)
          .json({ errors: { common: { msg: "Email or Phone Number Already Taken" } } });
      }
    } else {
      newAuth = new Authenticate({
        email,
        phone,
        hashed_password: hashedPassword,
        //userType: ifFirstOrgUser === null ? "admin" : "user",
        userType: "user",
      });
      await User.create(
        [
          {
            userId: newAuth._id,
            firstName,
            lastName,
            organizations:
              organization && orgData
                ? [
                    {
                      organizationId: orgData._id,
                      userType: ifFirstOrgUser === null ? "admin" : "user",
                    },
                  ]
                : null,
            // role: adminRoleData !== undefined ? adminRoleData._id : null,
          },
        ],
        { session }
      );
    }

    if (ifFirstOrgUser === null) {
      orgData.isVerified = true;
      await orgData.save();
    }
    const newAuthSaved = newAuth.save({ session });
    if (newAuthSaved) {
      const tempUserDelete = await Temp.findOneAndDelete({ phoneOrEmail, otp }, { session });
      if (!tempUserDelete) {
        const authUserDelete = await Authenticate.findOneAndDelete({ email, phone }, { session });
        if (!authUserDelete) {
          return res.send({ success: false, message: `Something went wrong` });
        }
      }

      const { accessToken, refreshToken } = await generateTokens({
        _id: newAuth._id,
      });
      await session.commitTransaction();
      return res.json({
        userData: {
          id: newAuth._id,
          fullName: `${firstName} ${lastName}`,
          username: "",
          avatar: "",
          email,
          // role: adminRoleData !== undefined ? adminRoleData._id : null,
          ability: [
            {
              action: "",
              subject: "",
            },
          ],
          extras: {
            eCommerceCartItemsCount: "",
          },
        },
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    await session.abortTransaction();
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
  session.endSession();
});

exports.signUpContact = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { password, otp, contactTypeId, assignerId, contactId, organization } = req.body;
    //const { organization } = req.headers;
    let organizationId = null;
    let orgData;
    if (organization) {
      orgData = await Organization.findOne({ path: organization });
    }
    const contact = await Contact.findById(mongoose.Types.ObjectId(contactId));

    // let phone = "";
    // let email = "";

    // if (phoneOrEmail.indexOf("@") === -1) {
    //   phone = phoneOrEmail;
    // } else {
    //   email = phoneOrEmail;
    // }
    const hashedPassword = (await hashPass(password)).toString();
    const tempUser = await Temp.findOne({ phoneOrEmail: contact.email, otp });
    if (!tempUser) {
      return res.status(401).json({ errors: { common: { msg: "Invalid OTP" } } });
    }
    const authUser = await Authenticate.findOne({ email: contact.email });
    let newAuth = {};
    let user;
    if (authUser !== null) {
      //add organization
      user = await User.findOne({ userId: mongoose.Types.ObjectId(authUser._id) });
      if (orgData && orgData._id) {
        organizationId = orgData._id;
      }

      if (
        user.roles &&
        user.roles.length > 0 &&
        user?.roles?.filter(
          (x) =>
            (organizationId !== null
              ? x.organizationId.equals(organizationId)
              : x.organizationId === null) &&
            x.contactTypeId.equals(contactTypeId) &&
            x.assignerId.equals(assignerId)
        ).length > 0
      ) {
        // you already signup pls login
        //remove auth
        return res.json({
          err: "You already Signedup. Please Login to access!",
        });
      } else {
        await User.findOneAndUpdate(
          { userId: mongoose.Types.ObjectId(authUser._id) },
          {
            $push: {
              roles: {
                organizationId: orgData && orgData._id ? orgData._id : null,
                contactTypeId: mongoose.Types.ObjectId(contactTypeId),
                assignerId: mongoose.Types.ObjectId(assignerId),
                contactId: mongoose.Types.ObjectId(contactId),
              },
            },
          }
        );
        const tempUserDelete = await Temp.findOneAndDelete(
          { phoneOrEmail: contact.email, otp },
          { session }
        );
        if (!tempUserDelete) {
          const authUserDelete = await Authenticate.findOneAndDelete(
            { email: contact.email },
            { session }
          );
          if (!authUserDelete) {
            return res.send({ success: false, message: `Something went wrong` });
          }
        }
        const { accessToken, refreshToken } = await generateTokens({
          _id: authUser._id,
        });
        await session.commitTransaction();
        return res.json({
          userData: {
            id: authUser._id,
            fullName: `${contact.fullName}`,
            username: "",
            avatar: "",
            email: contact.email,
            ability: [
              {
                action: "",
                subject: "",
              },
            ],
            roles: [
              {
                organizationId: orgData && orgData._id ? orgData._id : null,
                contactTypeId: mongoose.Types.ObjectId(contactTypeId),
                assignerId: mongoose.Types.ObjectId(assignerId),
                contactId: mongoose.Types.ObjectId(contactId),
              },
            ],
            extras: {
              eCommerceCartItemsCount: "",
            },
          },
          accessToken,
          refreshToken,
        });
      }
    } else {
      newAuth = new Authenticate({
        email: contact.email,
        phone: "",
        hashed_password: hashedPassword,
        userType: "user",
      });
      await User.create(
        [
          {
            userId: newAuth._id,
            firstName: contact.fullName.split(" ")[0] || "user",
            lastName: contact.fullName.split(" ")[1] || "a",
            organizations:
              organization && orgData
                ? [
                    {
                      organizationId: orgData._id,
                      userType: "user",
                    },
                  ]
                : null,
            roles: [
              {
                organizationId: orgData && orgData._id ? orgData._id : null,
                contactTypeId: mongoose.Types.ObjectId(contactTypeId),
                assignerId: mongoose.Types.ObjectId(assignerId),
                contactId: mongoose.Types.ObjectId(contactId),
              },
            ],
          },
        ],
        { session }
      );
      const newAuthSaved = newAuth.save({ session });
      if (newAuthSaved) {
        const tempUserDelete = await Temp.findOneAndDelete(
          { phoneOrEmail: contact.email, otp },
          { session }
        );
        if (!tempUserDelete) {
          const authUserDelete = await Authenticate.findOneAndDelete(
            { email: contact.email },
            { session }
          );
          if (!authUserDelete) {
            return res.send({ success: false, message: `Something went wrong` });
          }
        }

        const { accessToken, refreshToken } = await generateTokens({
          _id: newAuth._id,
        });
        await session.commitTransaction();
        return res.json({
          userData: {
            id: newAuth._id,
            fullName: `${contact.fullName}`,
            username: "",
            avatar: "",
            email: contact.email,
            ability: [
              {
                action: "",
                subject: "",
              },
            ],
            roles: [
              {
                organizationId: orgData && orgData._id ? orgData._id : null,
                contactTypeId: mongoose.Types.ObjectId(contactTypeId),
                assignerId: mongoose.Types.ObjectId(assignerId),
                contactId: mongoose.Types.ObjectId(contactId),
              },
            ],
            extras: {
              eCommerceCartItemsCount: "",
            },
          },
          accessToken,
          refreshToken,
        });
      }
    }
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
  session.endSession();
});

//get contact by id & return email
exports.getContactById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(mongoose.Types.ObjectId(id));
    return res.status(200).send({ success: true, email: contact.email });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { phoneOrEmail, password } = req.body;
  const { organization } = req.params;
  let phone = "";
  let email = "";
  let method;
  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  let user;
  if (method === "email") {
    if (organization) {
      orgData = await Organization.findOne({ path: organization });
      user = await Authenticate.findOne({ email: phoneOrEmail });
    } else {
      user = await Authenticate.findOne({ email: phoneOrEmail });
    }
    if (user === null) {
      return res.status(400).json({
        msg: "User Not Found",
      });
    }
  }

  if (method === "phone") {
    if (organization) {
      orgData = await Organization.findOne({ path: organization });
      user = await Authenticate.findOne({ email: phoneOrEmail });
    } else {
      user = await Authenticate.findOne({ phone: phoneOrEmail });
    }
  }

  if (user && (await bcrypt.compare(password, user.hashed_password))) {
    try {
      // Check if user is Active
      let userData = {};
      let isActive = true;
      let userPlan = {};

      if (user.userType === "super-admin") {
        userData = await User.findOne({ userId: user._id }).populate({
          path: "roles.contactTypeId",
          model: ContactType,
        });

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

        userPlan = {
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
      } else {
        userData = await User.findOne({ userId: user._id }).populate({
          path: "roles.contactTypeId",
          model: ContactType,
        });

        const plan = await SubscriptionBought.find({
          userId: userData.userId,
          expireDate: { $gte: new Date() },
        }).sort({ createdAt: -1 });

        if (plan.length === 0) {
          userPlan = await SubscriptionPlan.findOne({ isDefault: true });
        } else {
          userPlan = await SubscriptionPlan.findOne({ _id: plan[0].planId });
        }
      }

      await Authenticate.findOneAndUpdate({ email: phoneOrEmail }, { isLogout: false });

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
              organizationId: o._id,
              name: o.name,
              path: o.path,
              logo:o?.logoLink,
              userType: userData.organizations.find((x) => x.organizationId.equals(o._id))
                ?.userType,
            });
          }
        }

        let roles = [];
        let locs = [];
        if (userData?.roles?.length && userData?.roles?.length > 0) {
          const oIds = userData?.roles.map((x) => x.organizationId);
          const rolOrgs = await Organization.find({ _id: { $in: oIds } });
          let assignerIds = userData?.roles.map((x) => mongoose.Types.ObjectId(x.assignerId));
          locs = await User.find({ userId: { $in: assignerIds } });
          for (const r of userData?.roles) {
            const assigner = locs.find((x) => x.userId.equals(r.assignerId));
            roles.push({
              organizationId: r.organizationId,
              organizationName: rolOrgs.find((x) => x._id.equals(r.organizationId))?.name,
              orgPath: rolOrgs.find((x) => x._id.equals(r.organizationId))?.path,
              logo: rolOrgs.find((x) => x._id.equals(r.organizationId))?.logoLink,
              contactTypeId: r.contactTypeId,
              assignerId: r.assignerId,
              assignerName: `${assigner?.firstName} ${assigner?.lastName}`,
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
            email,
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
    } catch (err) {
      console.log(err)
      return res.status(401).json({ msg: err });
    }
  } else {
    return res.status(401).json({ msg: "Invalid Credential" });
  }
});

exports.sendResetPassOTP = asyncHandler(async (req, res) => {
  const { phoneOrEmail, countryCode } = req.body;

  if (!phoneOrEmail) {
    return res.status(400).json({
      failed: "Please provide Phone Or Email",
    });
  }
  let phone = "";
  let email = "";
  let method = "phone";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  /* eslint-disable no-console */
  console.log("====================================");
  console.log("Identifyer is ", method);
  console.log("====================================");
  /* eslint-enable */

  if(method === "email"){
    Authenticate.findOne({ email }).exec(async (err, user) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (!user) {
        return res.status(500).json({
          errors: { common: { msg: "Phone or Email is not valid" } },
        });
      }
      // Generate Otp
      const otp = generateOTP();
  
      // Save email and otp
      await ResetPass.create({
        phoneOrEmail,
        otp,
      });
  
      // Send otp
      if (method === "phone") {
        phoneOtpSend({ phone, otp, countryCode });
      } else {
        await sendEmailVerification(email, otp);
      }
      return res.status(201).json({
        success: "OTP Sending Successfull",
      });
    });
  }
  else{
    Authenticate.findOne({ phone }).exec(async (err, user) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
      if (!user) {
        return res.status(500).json({
          errors: { common: { msg: "Phone or Email is not valid" } },
        });
      }
      // Generate Otp
      const otp = generateOTP();
  
      // Save email and otp
      await ResetPass.create({
        phoneOrEmail,
        otp,
      });
  
      // Send otp
      if (method === "phone") {
        phoneOtpSend({ phone, otp, countryCode });
      } else {
        await sendEmailVerification(email, otp);
      }
      return res.status(201).json({
        success: "OTP Sending Successfull",
      });
    });
  }
 
});

// eslint-disable-next-line consistent-return
exports.resetPass = asyncHandler(async (req, res) => {
  const { otp, password } = req.body;

  const hashedPassword = (await hashPass(password)).toString();

  const user = await ResetPass.findOne({ otp });

  let phone = "";
  let email = "";
  let method = "phone";

  if (user) {
    if (user.phoneOrEmail.indexOf("@") === -1) {
      phone = user.phoneOrEmail;
      method = "phone";
    } else {
      email = user.phoneOrEmail;
      method = "email";
    }
    if (otp && password) {
      if (user.phoneOrEmail && parseInt(otp, 10) === parseInt(user.otp, 10)) {
        // =================
        Authenticate.findOneAndUpdate(
          { email },
          { hashed_password: hashedPassword },
          { new: true },
          (err, success) => {
            if (err) {
              console.log(err)
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }
            return res.status(200).json({
              success: "Password Reset Successfull",
            });
          }
        );
        await ResetPass.findOneAndDelete({ otp });
        // ==================
      } else {
        return res.status(401).json({
          failed: "OTP is invalid",
        });
      }
    } else {
      return res.status(400).json({
        failed: "Please provide all fields",
      });
    }
  } else {
    return res.status(400).json({
      failed: "User Not Found",
    });
  }
});

exports.validateToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    // Lets Verify Token
    //   token;
    const tokenDetails = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (tokenDetails._id !== "") {
      return res.send("valid");
    }
    return res.send("invalid");
  } catch (error) {
    return res.send("invalid");
  }
});

exports.signout = asyncHandler(async (req, res) => {
  await Authenticate.findOneAndUpdate({ _id: req.user._id }, { isLogout: true });

  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
});

exports.isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET_KEY,
  algorithms: ["HS256"],
});

// eslint-disable-next-line no-unused-vars
async function findUserData({ method, phoneOrEmail, user }) {
  let secondQuery = {};
  if (user.accType === "user") {
    secondQuery = {
      ...secondQuery,
    };
  }

  if (user.accType === "user-employee") {
    // build second Info
    if (method === "email") {
      secondQuery = {
        ...secondQuery,
        email: phoneOrEmail,
      };
    } else {
      // Method phone
      secondQuery = {
        ...secondQuery,
        phone: phoneOrEmail,
      };
    }
  }

  let userResultForOutput;
  if (method === "email") {
    const userData = await Authenticate.aggregate([
      { $match: { $or: [{ email: phoneOrEmail }] } },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },

      // Lookup user Employee
      {
        $lookup: {
          from: "u-employees",
          localField: "_id",
          foreignField: "userId",
          as: "employee",
          // if employee Login then Match Employee
          pipeline: [{ $match: secondQuery }],
        },
      },
    ]);

    // eslint-disable-next-line prefer-destructuring
    userResultForOutput = userData[0];
  }

  if (method === "phone") {
    const userData = await Authenticate.aggregate([
      { $match: { $or: [{ phone: phoneOrEmail }] } },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },

      // Lookup user Employee
      {
        $lookup: {
          from: "u-employees",
          localField: "_id",
          foreignField: "userId",
          as: "employee",
          // if employee Login then Match Employee
          pipeline: [{ $match: secondQuery }],
        },
      },
    ]);

    // eslint-disable-next-line prefer-destructuring
    userResultForOutput = userData[0];
  }

  return user;
}
