(function() {
    d3.fisheye = {
      circular: function() {
        var radius = 0.5,
            distortion = 0.05,
            k0,
            k1,
            focus = [0, 0];
  
        function fisheye(d) {
          var dx = d.x - focus[0],
              dy = d.y - focus[1],
              dd = Math.sqrt(dx * dx + dy * dy);
          if (!dd || dd >= radius) return {x: d.x, y: d.y, z: 1};
          var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
          return {x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10)};
        }
  
        function rescale() {
          k0 = Math.exp(distortion);
          k0 = k0 / (k0 - 1) * radius;
          k1 = distortion / radius;
          return fisheye;
        }
  
        fisheye.radius = function(_) {
          if (!arguments.length) return radius;
          radius = +_;
          return rescale();
        };
  
        fisheye.distortion = function(_) {
          if (!arguments.length) return distortion;
          distortion = +_;
          return rescale();
        };
  
        fisheye.focus = function(_) {
          if (!arguments.length) return focus;
          focus = _;
          return fisheye;
        };
  
        return rescale();
      }
    };
  })();
  