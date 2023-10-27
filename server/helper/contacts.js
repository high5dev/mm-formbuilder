const { ContactType } = require("../models/index");
const { default: mongoose } = require("mongoose");

module.exports.getContactTypesHelper = async (userId, organizationId) => {
  //organizationId can be null
  try {
    const user = await Authenticate.findById(mongoose.Types.ObjectId(userId))
    if (organizationId !== null) {
      const contactType = await ContactType.find({
        //userType: req.user.userType,
        organizationId: mongoose.Types.ObjectId(organizationId),

        isDelete: false,
      }).sort({ order: 1 });
      return contactType;
    } else {
      const contactType = await ContactType.find({
        creatorType: user.userType,
        userId: mongoose.Types.ObjectId(userId),
        organizationId: null,
        isDelete: false,
      }).sort({ order: 1 });

      return contactType;
    }
  } catch (error) {}
};
