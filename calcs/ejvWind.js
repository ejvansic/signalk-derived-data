module.exports = function (app, plugin) {
  return [
    {
      group: 'wind',
      optionKey: 'ejvWind',
      title: 'Ground Wind Angle and Speed (based on SOG, HDG, COG, AWA and AWS)',
      derivedFrom: [
        'navigation.speedOverGround',
        'navigation.courseOverGroundTrue',
        'navigation.headingTrue',
        'environment.wind.speedApparent',
        'environment.wind.angleApparent'
      ],
      calculator: function (sog, cog, hdg, aws, awa) {
/*
        hdg = -0.087266
        aws = 15.0
        awa = -0.523598
        cog = 0.087266
        sog = 7.0
*/
        awd = hdg + awa
        if (awd > Math.PI*2) awd -= Math.PI *2
        else if (awd < 0) awd += Math.PI * 2
        var trueY =  aws * Math.sin(awd) - sog * Math.sin(cog)
        var trueX = aws * Math.cos(awd) - sog * Math.cos(cog)
        var speed = Math.sqrt(
          Math.pow(trueY, 2) + Math.pow(trueX, 2)
        )
        var angle = awa
        var twd = awd
        if (speed >= 0.01) {
          twd = Math.atan2(trueY, trueX)
          if (twd < 0) twd += Math.PI * 2
          angle = twd - hdg
          if (angle < -Math.PI) angle += Math.PI * 2
          else if (angle > Math.PI) angle -= Math.PI * 2
        }

        return [
          { path: 'environment.wind.angleTrueGround', value: angle },
          { path: 'environment.wind.speedOverGround', value: speed },
          { path: 'environment.wind.directionTrue', value: twd }
        ]
      }
    }
  ]
}

