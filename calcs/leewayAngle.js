// calculation source: https://arvelgentry.jimdo.com/app/download/9157993883/Arvel+Gentry+-+Sailboat_Performance_Testing_Techniques.pdf?t=1485748085
module.exports = function (app, plugin) {
  return {
    group: 'heading',
    optionKey: 'leewayAngle',
    title: 'Leeway (based on heading and COG)',
    derivedFrom: [
      'navigation.headingTrue',
      'navigation.courseOverGroundTrue',
      'navigation.speedOverGround'
    ],
    calculator: function (hdg, cog, sog) {
      var leewayAngle = 0.0
      if (sog > 0.5) {
        leewayAngle = Math.abs(hdg - cog)
        if (leewayAngle > Math.PI) leewayAngle = Math.Abs(Math.PI*2 - leewayAngle)
      }
      // app.debug("leeway angle: " + leewayAngle);
      return [{ path: 'navigation.leewayAngle', value: leewayAngle }]
    }
  }
}
