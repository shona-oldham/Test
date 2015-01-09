<script>
  Benchmark.prototype.setup = function() {
    var arr = [];
    for (var i = 0; i < 5000; i++) {
      arr.push(Math.random());
    }

    // Actual code

    function bisect(items, x, lo, hi, target) {
      var mid;
      if (typeof(lo) == 'undefined') lo = 0;
      if (typeof(hi) == 'undefined') hi = items.length;
      while (lo < hi) {
        mid = Math.floor((lo + hi) / 2);
        if (closerToTarget(x, items[mid], target) < 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }

    function insort(items, x, target) {
      items.splice(bisect(items, x, target), 0, x);
    }

    function partialSort(items, k, target) {
      var smallest = items.slice(0, k).sort(function(a, b){
        return closerToTarget(a, b, target);
      });
      var max = smallest[k - 1];
      for (var i = k, len = items.length; i < len; ++i) {
        var item = items[i];
        if (closerToTarget(item, max, target) < 0) {
          insort(smallest, item, target);
          smallest.length = k;
          max = smallest[k - 1];
        }
      }      
      
      return smallest;
    }

    function closerToTarget(nodeA, nodeB, target) {
      // return -1 if a closer than b
      // return 1 if b closer than a
      // 0 if equal

      var nodeAId = HexDecode(nodeA);
      var nodeBId = HexDecode(nodeB);
      var targetId = HexDecode(target);
      for (var i = 0; i < 64; ++i) {
        var result1 = nodeAId[i] ^ targetId[i];
        var result2 = nodeBId[i] ^ targetId[i];
        if (result1 != result2)
          return result1 < result2 ? -1 : 1;
      }
      return 0;
    }

    function HexDecode(hex) {
      var str = '';
      for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return str;
    }
  };
</script>