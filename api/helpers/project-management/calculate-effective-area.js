module.exports = {


  friendlyName: 'Calculate effective area',


  description: '',


  inputs: {
    height: {
      type: 'number',
      required: true
    },

    width: {
      type: 'number',
      required: true
    },

    depth: {
      type: 'number',
      required: true
    },

    installationTypeId: {
      type: 'number',
      required: true
    },

    positionId: {
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

    var surfaceFactorArray = await RefDataSurfaceFactor.find({
      installationTypeId: inputs.installationTypeId,
      cubiclePositionId: inputs.positionId
    });

    var cubicleSurfaceIds = await RefDataMaster.find({ category: 'CUBICLE_SURFACE' });

    const combinedArray = surfaceFactorArray.map(item1 => {
      const matchingItem = cubicleSurfaceIds.find(item2 => item2.id === item1.surfaceId);
      return {
        ...item1,
        ...matchingItem
      };
    });
    var effectiveArea = 0;
    var top;
    var left;
    var right;
    var back;
    var front;

    for (let i = 0; i < combinedArray.length; i++) {

      if (combinedArray[i].value == 'TOP') {
        var topArea = Math.round(((Math.round(((inputs.width * inputs.depth) + Number.EPSILON)*100)/100 * combinedArray[i].surfaceFactor) + Number.EPSILON)*100)/100;
        effectiveArea += topArea;
        top = {
          dimension: inputs.width + " X " + inputs.depth,
          area: Math.round(((inputs.width * inputs.depth) + Number.EPSILON)*100)/100,
          surfaceFactor: combinedArray[i].surfaceFactor,
          effectiveArea: topArea
        }

      } else if (combinedArray[i].value == 'LEFT') {
        var leftArea = Math.round(((Math.round(((inputs.height * inputs.depth) + Number.EPSILON)*100)/100 * combinedArray[i].surfaceFactor) + Number.EPSILON)*100)/100;
        effectiveArea += leftArea;
        left = {
          dimension: inputs.height + " X " + inputs.depth,
          area: Math.round(((inputs.height * inputs.depth) + Number.EPSILON)*100)/100,
          surfaceFactor: combinedArray[i].surfaceFactor,
          effectiveArea: leftArea
        }

      } else if (combinedArray[i].value == 'RIGHT') {
        var rightArea = Math.round(((Math.round(((inputs.height * inputs.depth) + Number.EPSILON)*100)/100 * combinedArray[i].surfaceFactor) + Number.EPSILON)*100)/100;
        effectiveArea += rightArea;
        right = {
          dimension: inputs.height + " X " + inputs.depth,
          area: Math.round(((inputs.height * inputs.depth) + Number.EPSILON)*100)/100,
          surfaceFactor: combinedArray[i].surfaceFactor,
          effectiveArea: rightArea
        }

      } else if (combinedArray[i].value == 'BACK') {
        var backArea = Math.round(((Math.round(((inputs.height * inputs.width) + Number.EPSILON)*100)/100 * combinedArray[i].surfaceFactor) + Number.EPSILON)*100)/100;
        effectiveArea += backArea;
        back = {
          dimension: inputs.height + " X " + inputs.width,
          area: Math.round(((inputs.height * inputs.width) + Number.EPSILON)*100)/100,
          surfaceFactor: combinedArray[i].surfaceFactor,
          effectiveArea: backArea
        }

      } else if (combinedArray[i].value == 'FRONT') {
        var frontArea = Math.round(((Math.round(((inputs.height * inputs.width) + Number.EPSILON)*100)/100 * combinedArray[i].surfaceFactor) + Number.EPSILON)*100)/100;
        effectiveArea += frontArea;
        front = {
          dimension: inputs.height + " X " + inputs.width,
          area: Math.round(((inputs.height * inputs.width) + Number.EPSILON)*100)/100,
          surfaceFactor: combinedArray[i].surfaceFactor,
          effectiveArea: frontArea
        }
      }

    }


    return {
      effectiveArea: Math.round((effectiveArea + Number.EPSILON)*100)/100,
      effectiveCoolingSurface: {
        top: top,
        left: left,
        right: right,
        back: back,
        front: front
      }
    }

  }


};

