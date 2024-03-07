module.exports = {


  friendlyName: 'Calculate temp rise',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'Cubicle saved successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var cubicleData = await sails.helpers.projectManagement.getCubicleData(inputs.cubicleId);

      var effectiveAreaData = await sails.helpers.projectManagement.calculateEffectiveArea(
        cubicleData.HEIGHT/1000,
        cubicleData.WIDTH/1000,
        cubicleData.DEPTH/1000,
        cubicleData.INSTALLATION_TYPE_ID,
        cubicleData.POSITION_ID
      )

      var tempRiseConstants = await sails.helpers.projectManagement.calculateTempRiseConstants(
        effectiveAreaData.effectiveArea,
        cubicleData.HEIGHT,
        cubicleData.WIDTH,
        cubicleData.DEPTH,
        cubicleData.LOUVER_AREA,
        cubicleData.HORIZONTAL_SEPERATION,
        cubicleData.INSTALLATION_TYPE_ID,
        cubicleData.POSITION_ID
      )
      
      var px = Math.round((Math.pow(cubicleData.POWER_LOSS, tempRiseConstants.x)+ Number.EPSILON)*100)/100;
      var t50 = tempRiseConstants.k * tempRiseConstants.d * px;
      var t100 = tempRiseConstants.c * t50;
      var t75 = (t100 + t50) / 2;
      var t25 = (2 * t50) - t75;
      var t0 = (2 * t50) - t100;

      xValues = [
        Math.round((t0+ Number.EPSILON)*100)/100, 
        Math.round((t25+ Number.EPSILON)*100)/100, 
        Math.round((t50+ Number.EPSILON)*100)/100, 
        Math.round((t75+ Number.EPSILON)*100)/100, 
        Math.round((t100+ Number.EPSILON)*100)/100
      ];
      yValues = [0, 25, 50, 75, 100]

      var coefficients = await findLinearCoefficients(xValues, yValues)

      var linearGraph = {
        coefficients: coefficients,
        points: {
          xValues: xValues,
          yValues: yValues
        }
      }

      var gr = 0.5 / (t100 - t50);
      var b = ((4 * gr) - 1) * (1 / t25);
      var c = Math.log(0.25 / t25) - (((4 * gr) - 1) * t25);

      var curvedGraph = {
        gr: Math.round((gr+ Number.EPSILON)*100)/100,
        b: Math.round((b+ Number.EPSILON)*100)/100,
        c: Math.round((c+ Number.EPSILON)*100)/100
      }

      var reportData = await sails.helpers.projectManagement.generateReportData(
        cubicleData,
        effectiveAreaData.effectiveCoolingSurface,
        effectiveAreaData.effectiveArea,
        tempRiseConstants,
        px,
        Math.round((t50+ Number.EPSILON)*100)/100,
        Math.round((t100+ Number.EPSILON)*100)/100
      );

      return exits.success({
        reportData: reportData,
        linearGraph: linearGraph,
        curvedGraph: curvedGraph,
        finalTemp: Math.round(((cubicleData.AMBIENT_TEMP + t100)+ Number.EPSILON)*100)/100
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }
};


function findLinearCoefficients(xValues, yValues) {
  const n = xValues.length;
  const sumX = xValues.reduce((acc, x) => acc + x, 0);
  const sumY = yValues.reduce((acc, y) => acc + y, 0);
  const sumXY = xValues.reduce((acc, x, i) => acc + x * yValues[i], 0);
  const sumXSquared = xValues.reduce((acc, x) => acc + x**2, 0);

  const a = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX**2);
  const b = (sumY - a * sumX) / n;

  return {
    d: Math.round((a+ Number.EPSILON)*100)/100, 
    e: Math.round((b+ Number.EPSILON)*100)/100
  };
}
