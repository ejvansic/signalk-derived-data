module.exports = function (app, plugin) {
  return [
    {
      group: 'course data',
      optionKey: 'speedWater',
      title: 'Speed Through Water from SOG (no transducer avail)',
      derivedFrom: [
        'navigation.speedOverGround'
      ],
      calculator: function (sog) {
        return [
          { path: 'navigation.speedThroughWater', value: sog }
        ]
      }
    }
  ]
}

