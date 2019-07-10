var assert = require('assert');
import { util } from '../src/util.js'

var qualifyForBadgesPayload = {
  "12345": {
    "a1": {
      right: 3,
      wrong: 3,
      times: [2]
    },
    "b1": {
      right: 7,
      wrong: 3,
      times: [2]
    }
  }
}

var payload = {
	"1562469039508": {
		"a1": {
			"right": 1,
			"times": [16],
			"wrong": 7
		},
		"b1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"c1": {
			"right": 1,
			"times": [3],
			"wrong": 0
		},
		"c2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"e1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"e2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"f1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"f2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"g1": {
			"right": 0,
			"times": [],
			"wrong": 0
		}
	},
	"9562469201038": {
		"a1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"b1": {
			"right": 1,
			"times": [290],
			"wrong": 5
		},
		"c1": {
			"right": 4,
			"times": [7, 2, 2, 1],
			"wrong": 1
		},
		"c2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"e1": {
			"right": 1,
			"times": [12],
			"wrong": 2
		},
		"e2": {
			"right": 2,
			"times": [4, 10],
			"wrong": 1
		},
		"f1": {
			"right": 2,
			"times": [57, 13],
			"wrong": 5
		},
		"f2": {
			"right": 1,
			"times": [328],
			"wrong": 2
		},
		"g1": {
			"right": 1,
			"times": [3],
			"wrong": 0
		}
	},
	"1562539341954": {
		"a1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"b1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"c1": {
			"right": 1,
			"times": [6],
			"wrong": 0
		},
		"c2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"d2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"e1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"e2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"f1": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"f2": {
			"right": 0,
			"times": [],
			"wrong": 0
		},
		"g1": {
			"right": 0,
			"times": [],
			"wrong": 2
		}
	}
} 

describe('util', function() {
  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct rights for all history entries', function() {
      assert.deepEqual(stats.rights, [2,12,1]);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct wrongs for all history entries', function() {
      assert.deepEqual(stats.wrongs, [7,16,2]);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct wrongs for all history entries', function() {
      assert.deepEqual(stats.averageTimePerNote, [9.5,60.75,6]);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct wrongs for all history entries', function() {
      assert.deepEqual(stats.timeInEachSession, [19,729,6]);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct sessions for all history entries', function() {
      assert.deepEqual(stats.sessions, [1,2,3]);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct rights for the most recent(current) history', function() {
      assert.equal(stats.currentRights, 12);
    });
  });

  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct wrongs for the most recent(current) history', function() {
      assert.equal(stats.currentWrongs, 16);
    });
  });
  
  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct reduced times recent(current) history', function() {
      assert.equal(stats.currentTimePerNote, 60.75);
    });
  });
  
  describe('getStatsFromFullPayload', function() {
    var stats = util.getStatsFromFullPayload(payload)
    it('should return the correct reduced times recent(current) history', function() {
      assert.equal(stats.currentTimeInSession, 729);
    });
  });
  
  describe('getNewBadges', function() {
    var badges = util.getNewBadges([],qualifyForBadgesPayload)
    it('should return the correct number of new badges when no badges were previously awarded', function() {
      assert.deepEqual(badges,['five','quick']);
    });
  });

  describe('getNewBadges', function() {
    var badges = util.getNewBadges(['five','quick'],qualifyForBadgesPayload)
    it('should return the correct number of new badges when all badges were previously awarded', function() {
      assert.deepEqual(badges,[]);
    });
  });

  describe('getNewBadges', function() {
    var badges = util.getNewBadges(['five'],qualifyForBadgesPayload)
    it('should return the correct number of new badges when some badges were previously awarded', function() {
      assert.deepEqual(badges,['quick']);
    });
  });
  
});
