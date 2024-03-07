module.exports = {


  friendlyName: 'Calculate temp rise constants',


  description: '',


  inputs: {
    effectiveArea: {
      type: 'number',
      required: true
    },

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

    louverArea: {
      type: 'number',
      required: true
    },

    horizontalSeperations: {
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
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var k = 0;
    var d = 0;
    var c = 0;
    var x = 0;
    var f = 0;
    var g = 0;
    
    if (inputs.effectiveArea > 1.25) {
      f = Math.pow(inputs.height, 1.35) / (inputs.width * inputs.depth);

      if (inputs.louverArea > 0) {
        // ======= Section B =======

        // Constant k
        let Ae = Number(inputs.effectiveArea.toFixed(1));
        if (Ae !== 2.5 && Ae !== 1.5) {
          if (Math.round(Ae) == 9){
            Ae = 10;
          } else if (Math.round(Ae) > 14) {
            Ae = 14;
          } else {
            Ae = Math.round(Ae);
          }
        }
        var constantasForK = await RefDataConstantK.findOne({ section: 'B', ae: Ae });
        k = (((constantasForK.a + constantasForK.b * inputs.louverArea) / (1 + (constantasForK.c * inputs.louverArea) + (constantasForK.d * Math.pow(inputs.louverArea, 2)))) * (0.33 / 0.38)) + 0.05;

        // Constant d
        var constantasForD = await RefDataConstantD.findOne({ section: 'B', horizontalPartitionCount: inputs.horizontalSeperations });
        d = constantasForD.d;

        // Constant c
        let roundedF = Number(f.toFixed(1));
        if (roundedF !== 1.5) {
          if (roundedF < 1.5) {
            roundedF = 1.5;
          } else if (Math.round(roundedF) > 10) {
            roundedF = 10;
          } else {
            roundedF = Math.round(roundedF);
          }
        } 
        var constantasForC = await RefDataConstantC.findOne({ section: 'B', f: roundedF });
        c = ((constantasForC.a + constantasForC.b * inputs.louverArea) * 0.96) / (1 + constantasForC.c * inputs.louverArea + constantasForC.d * Math.pow(inputs.louverArea, 2));

        // Constant x
        var constantasForX = await RefDataConstantX.findOne({ section: 'B' });
        x = constantasForX.x;

      } else {
        // ======= Section A =======

        // Constant k
        var constantasForK = await RefDataConstantK.findOne({ section: 'A' });
        k = constantasForK.a / (1 + (constantasForK.b * Math.exp(-constantasForK.c * inputs.effectiveArea)))

        // Constant d
        var constantasForD = await RefDataConstantD.findOne({ section: 'A', horizontalPartitionCount: inputs.horizontalSeperations });
        d = constantasForD.d;

        // Constant c
        var constantasForC = await RefDataConstantC.findOne({ section: 'A', f: 0, installationTypeId: inputs.installationTypeId, cubiclePositionId: inputs.positionId });
        c = (constantasForC.a * Math.exp(-Math.exp(constantasForC.b - (constantasForC.c * f))) * (0.6 / 1.6)) + 1;

        // Constant x
        var constantasForX = await RefDataConstantX.findOne({ section: 'A' });
        x = constantasForX.x;

      }

    } else {
      // ======= Section C =======

      g = inputs.height / inputs.width;

      // Constant k
      var constantasForK = await RefDataConstantK.findOne({ section: 'C' });
      k = constantasForK.q0 * Math.pow((1 + (constantasForK.b * (inputs.effectiveArea / constantasForK.a))), (-1 / constantasForK.b))

      // Constant d
      var constantasForD = await RefDataConstantD.findOne({ section: 'C', horizontalPartitionCount: 0 });
      d = constantasForD.d;

      // Constant c
      var constantasForC = await RefDataConstantC.findOne({ section: 'C' });
      c = constantasForC.a / Math.pow((1 + Math.exp(constantasForC.b - (constantasForC.c * g))), (1 / constantasForC.d))

      // Constant x
      var constantasForX = await RefDataConstantX.findOne({ section: 'C' });
      x = constantasForX.x;
    }

    return {
      k: k,
      d: d,
      c: c,
      x: x,
      g: g,
      f: f
    }

  }


};

