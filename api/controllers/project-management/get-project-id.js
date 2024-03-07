module.exports = {


    friendlyName: 'Get project id',

  
    description: '',

  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      try {
  
        var projectIdRequestQuery = `SELECT COALESCE(MAX(id), 0) AS id FROM public."PROJECT" `;
  
        var projectId = await sails.sendNativeQuery(projectIdRequestQuery);
        if(projectId) {
            let projectIdDataVM = {
                projectId : projectId.rows[0].id
            }
      
            return exits.success({
                projectIdDataVM : projectIdDataVM,
                isSuccess: true
            });
        }
        else {
            return exits.success({
                isSuccess: false,
                message: "Cannot generate Project Id. Please Try again"
            });
        }
  
      } catch (error) {
        sails.log.error(error);
        return this.res.serverError(error);
      }
  
  
    }
  
  
  };
  