module.exports = {


  friendlyName: 'Search project',


  description: '',


  inputs: {
    tabName: {
      type: 'string',
      required: true
    },

    userId: {
      type: 'number',
      required: true
    },

    userType: {
      type: 'string',
      required: true
    },

    searchString: {
      type: 'string'
    },

    pageNo: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Matched projects found successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var user = await User.findOne({
        id: inputs.userId
      });

      if (!user) {
        return this.res.userNotFound();
      }

      if (user.userType.toLowerCase() !== inputs.userType.toLowerCase()) {
        return this.res.badRequest();
      }

      var searchResultsArray = await sails.helpers.projectManagement.getProjects(
        inputs.tabName,
        inputs.userId,
        inputs.userType,
        inputs.searchString,
        inputs.pageNo
      );

      projectSearchResponseDataVM = {
        searchResultDataVM: searchResultsArray,
        totalResults: searchResultsArray.length === 0 ? 0 : searchResultsArray[0].COUNT
      };

      return exits.success({
        projectSearchResponseDataVM: projectSearchResponseDataVM,
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);

      if (error.code === sails.config.custom.invalidParamsError) {
        return this.res.badRequest(error);
      }

      return this.res.serverError(error);
    }

  }


};
