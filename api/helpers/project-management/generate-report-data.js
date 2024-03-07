module.exports = {


  friendlyName: 'Generate report data',


  description: '',


  inputs: {
    cubicleData: {
      type: 'ref',
      required: true
    },

    effectiveCoolingSurface: {
      type: 'ref',
      required: true
    },

    effectiveArea: {
      type: 'number',
      required: true
    },

    tempRiseConstants: {
      type: 'ref',
      required: true
    },

    px: {
      type: 'number',
      required: true
    },

    t50: {
      type: 'number',
      required: true
    },

    t100: {
      type: 'number',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var reportData = {
      cubicleId: inputs.cubicleData.id,
      createdDate: inputs.cubicleData.CREATED_DATE,
      customerName: inputs.cubicleData.USER_NAME,
      projectNo: inputs.cubicleData.PROJECT_NO,
      projectName: inputs.cubicleData.PROJECT_NAME,
      cubiclePosition: inputs.cubicleData.CUBICLE_POSITION,
      installationType: inputs.cubicleData.INSTALLATION_TYPE,
      horizontalPartitions: inputs.cubicleData.HORIZONTAL_SEPERATION,
      height: inputs.cubicleData.HEIGHT,
      width: inputs.cubicleData.WIDTH,
      depth: inputs.cubicleData.DEPTH,
      demandFactor: inputs.cubicleData.DEMAND_FACTOR,
      effectiveCoolingSurface: inputs.effectiveCoolingSurface,
      effectiveArea: inputs.effectiveArea,
      f: Math.round((inputs.tempRiseConstants.f + Number.EPSILON)*100)/100,
      g: Math.round((inputs.tempRiseConstants.g + Number.EPSILON)*100)/100,
      airInletOpenings: inputs.cubicleData.LOUVER_AREA,
      k: Math.round((inputs.tempRiseConstants.k + Number.EPSILON)*100)/100,
      d: Math.round((inputs.tempRiseConstants.d + Number.EPSILON)*100)/100,
      powerloss: inputs.cubicleData.POWER_LOSS,
      px: inputs.px,
      t50: inputs.t50,
      c: Math.round((inputs.tempRiseConstants.c + Number.EPSILON)*100)/100,
      t100: inputs.t100
      }

    return reportData;
  }
};

