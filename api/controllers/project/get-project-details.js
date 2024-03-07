module.exports = {
    friendlyName: 'Get project details',
    description: 'Retrieve project details based on the user type and tab.',

    inputs: {
        userType: {
            type: 'string',
            required: true,
        },

        userId: {
            type: 'number',
        },

        tabName: {
            type: 'string',
            required: true,
        },

        pageNo: {
            type: 'number'
        }
    },

    exits: {
    },

    fn: async function (inputs, exits) {
        try {
            let query = '';
            let params = [];

            if (inputs.tabName === 'all') {
                if (inputs.userType === 'admin') {
                    query = `
                        SELECT
                            p."createdAt" AS "CREATED_DATE", p.id AS "PROJECT_ID", p."PROJECT_NAME", 
                            p."ELEVATION", p."DEMAND_FACTOR", p."AMBIENT_TEMP", p."IS_EDITING", p."USER_ID", u_parent."NAME" AS "DISTRIBUTOR_NAME", 
                            u_child."NAME" AS "CUSTOMER_NAME", COUNT(*) OVER() AS "COUNT"
                        FROM public."PROJECT" p
                        LEFT JOIN public."USER" u_child ON p."USER_ID" = u_child.id
                        LEFT JOIN public."USER" u_parent ON u_child."PARENT_ID" = u_parent.id
                        ORDER BY "CREATED_DATE" DESC
                        OFFSET $1 * ${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage}`;

                    params.push(inputs.pageNo);
                } else if (inputs.userType === 'distributor') {
                    query = `
                        SELECT
                            p."createdAt" AS "CREATED_DATE", p.id AS "PROJECT_ID", p."PROJECT_NAME", p."ELEVATION",
                            p."DEMAND_FACTOR", p."AMBIENT_TEMP", p."IS_EDITING", p."USER_ID", u."NAME" AS "CUSTOMER_NAME", COUNT(*) OVER() AS "COUNT"
                        FROM public."PROJECT" p
                        RIGHT JOIN public."USER" u ON p."USER_ID" = u.id
                        WHERE p."USER_ID" = $1
                        OR p."USER_ID" IN (SELECT id FROM public."USER" WHERE "PARENT_ID" = $1)
                        ORDER BY p."createdAt" DESC
                        OFFSET $2 * ${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage}`;

                    params.push(inputs.userId, inputs.pageNo);
                } else {
                    return exits.invalidInput();
                }
            } else {
                query = `
                    SELECT 
                        "createdAt" "CREATED_DATE", id "PROJECT_ID", "PROJECT_NAME", "ELEVATION", "DEMAND_FACTOR", 
                        "AMBIENT_TEMP", "IS_EDITING", "USER_ID", COUNT(*) OVER() AS "COUNT"
                    FROM public."PROJECT"
                    WHERE "USER_ID" = $1
                    ORDER BY "createdAt" DESC
                    OFFSET $2 * ${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage}`;

                params.push(inputs.userId, inputs.pageNo);
            }

            const projectsArray = await sails.sendNativeQuery(query, params);

            for (let i = 0; i < projectsArray.rows.length; i++) {
                projectsArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(projectsArray.rows[i].CREATED_DATE);
            }

            const pastProjectDetailsResponseDataVM = {
                projectDetails: projectsArray.rows,
                totalProjects: projectsArray.rows.length === 0 ? 0 : projectsArray.rows[0].COUNT
            };

            return exits.success({
                isSuccess: true,
                pastProjectDetailsResponseDataVM: pastProjectDetailsResponseDataVM,
            });
        } catch (error) {
            sails.log.error(error);
            return exits.serverError(error);
        }
    },
};
