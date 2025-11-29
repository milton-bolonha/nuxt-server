import { d as defineEventHandler, a as getQuery, c as createError } from '../../_/nitro.mjs';
import * as util$1 from 'util';
import * as postmanRequest from 'postman-request';
import * as crypto$3 from 'crypto';
import * as cheerio from 'cheerio';
import * as url from 'url';
import * as events$h from 'events';
import * as signalr from '@microsoft/signalr';
import * as entities$1 from 'entities';
import * as fs from 'fs';
import axios from 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var lib = {exports: {}};

var getUserSocialLinks$1 = {};

var http$1_ = {};

const require$$0$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(util$1);

const require$$1$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(postmanRequest);

var options$6 = {};

var show_deprecation_warnings = true;
var show_deprecation_warnings_desc = "Prints console warnings for functions that are being polyfilled by newer methods due to upstream Roblox API changes";
var session_only = true;
var session_only_desc = "Minimizes data usage and speed up requests by only saving session cookies, disable if you need other cookies to be saved as well.";
var timeout$3 = 10000;
var timeout_desc = "Timeout for http requests. This is necessary for functions that make a very large number of requests, where it is possible some simply won't connect.";
var event = {
	maxRetries: 5,
	maxRetries_desc: "Maximum number of consecutive retries after an event times out or fails in some other way.",
	timeout: 10000,
	timeout_desc: "Maximum time (in milliseconds) a request can take. If your server has extremely high latency you may have to raise this.",
	event_desc: "Below is the poll time (in milliseconds) for each of the event functions. A lower number will detect changes much quicker but will stress the network, a higher one does the opposite.",
	defaultDelay: 10000,
	onAuditLog: 10000,
	onWallPost: 10000,
	onJoinRequestHandle: 10000,
	onJoinRequest: 10000,
	onShout: 10000,
	onBlurbChange: 10000,
	onGroupTransaction: 60000
};
var thumbnail = {
	maxRetries: 2,
	maxRetries_desc: "Maximum number of retries to retrieve a pending thumbnail, rare, but occurs with uncached users (Roblox's cache)",
	retryDelay: 500,
	retryDelay_desc: "The time to wait between consecutive retries of retrieving pending thumbnails",
	failedUrl: {
		pending: "",
		blocked: ""
	},
	failedUrl_desc: "The image URL to provide when an asset thumbnail is still pending or has been moderated by Roblox; defaults to Roblox moderation icon via noblox.js's GitHub repo at https://noblox.js.org/moderatedThumbnails/moderatedThumbnail_{size}.png"
};
var queue$1 = {
	Message: {
		delay: 0,
		desc: "Although messages do have a floodcheck, it is not instituted immediately so this is disabled by default. If you are sending a lot of messages set a delay around 10-15 seconds (10000-15000)"
	}
};
var cache$b = {
	XCSRF: {
		expire: 1800,
		refresh: false,
		desc: "XCSRF tokens expire 30 minutes after being created. Until they expire, however, no new tokens can be made. Sometimes an XCSRF token has already been created for the user so the server doesn't know when to collect a new one. During transitions some requests may use invalid tokens. For now, new XCSRF tokens are automatically retrieved when cached ones get rejected."
	},
	Verify: {
		expire: 7200,
		refresh: 3600,
		desc: "Verification tokens seem to last extremely long times."
	},
	Roles: {
		expire: 600,
		refresh: true,
		desc: "This should be fine unless your group changes its ranks often."
	},
	RolesetId: {
		expire: 86400,
		refresh: false,
		desc: "Disable this completely if you don't plan on ever changing your exile bot's rank."
	},
	Product: {
		expire: false,
		refresh: false,
		desc: "Disabled by default for security (price checks). If you are only working with ROBLOX assets, however, you can set this to something high (since ROBLOX product info rarely changes)."
	},
	GamePassProduct: {
		expire: 86400,
		refresh: false,
		desc: "This should normally be fine unless the information of GamePasses you are working with changes frequently."
	},
	NameFromID: {
		expire: false,
		refresh: false,
		desc: "Caches a user's username based on their ID. It is not on by default because it is an uncontrollable change but the option is there to cache it if you would like."
	},
	IDFromName: {
		expire: true,
		refresh: false,
		desc: "Permanent cache for a user's ID based on their name. There is no reason this would ever change (changing names would re-match it and old names cannot be reused by other accounts). Only disable if you want this to match current names only."
	},
	SenderID: {
		expire: true,
		refresh: false,
		desc: "Permanent cache for the sender's user ID. This should literally never change."
	},
	Rank: {
		expire: false,
		refresh: false,
		desc: "Caches rank by user ID. Changes cannot be anticipated so this is not enabled by default."
	},
	UsernameHistory: {
		expire: 86400,
		refresh: false,
		desc: "Caches a user's username history based on user id, limit, sort order, and cursor. The rate limit for the associated endpoint is very low, and this setting should be left alone as a result."
	}
};
const require$$196 = {
	show_deprecation_warnings: show_deprecation_warnings,
	show_deprecation_warnings_desc: show_deprecation_warnings_desc,
	session_only: session_only,
	session_only_desc: session_only_desc,
	timeout: timeout$3,
	timeout_desc: timeout_desc,
	event: event,
	thumbnail: thumbnail,
	queue: queue$1,
	cache: cache$b
};

var jar = {};

// Dependencies
const util = require$$0$4;
const request = util.promisify(require$$1$1);

// Includes
const settings$a = require$$196;

// Docs
/**
 * ✅ Create a jar file based on sessionOnly.
 * @category Utility
 * @alias jar
 * @param {boolean=} sessionOnly - The session to use to create the jar file.
 * @returns {CookieJar}
 * @example const noblox = require("noblox.js")
 * const jar = noblox.jar()
**/

// Define
jar.func = function (sessionOnly) {
  if (!sessionOnly) {
    sessionOnly = settings$a.session_only;
  }
  return (sessionOnly ? { session: '' } : request.jar())
};

// Define
var _new = function (types) {
  const cache = {};
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const expireValue = type.expire;
    const permanent = expireValue === true;
    const expire = (permanent || expireValue === false ? 0 : expireValue);
    cache[type.name] = { items: {}, expire, refresh: type.refresh, permanent };
  }
  return cache
};

(function (exports$1) {
	// Includes
	const settings = require$$196;
	const jar$1 = jar.func;
	const newCache = _new;

	// Define
	exports$1.init = function () {
	  exports$1.jar = jar$1();

	  const cacheList = [];
	  const cache = settings.cache;
	  for (const name of Object.keys(cache)) {
	    const item = cache[name];
	    const cacheObj = {
	      name,
	      refresh: item.refresh,
	      expire: item.expire
	    };
	    cacheList.push(cacheObj);
	  }
	  exports$1.cache = newCache(cacheList);

	  exports$1.queue = settings.queue;
	};

	exports$1.init(); 
} (options$6));

// Define
function shallowCopy (obj) {
  return Object.assign(obj instanceof Array ? [] : {}, obj)
}

var levelOneCopy$2 = function (obj) {
  const newObj = shallowCopy(obj);
  for (const index in obj) {
    let value = obj[index];
    if (value instanceof Object) {
      value = shallowCopy(value);
    }
    newObj[index] = value;
  }
  return newObj
};

// Includes
const levelOneCopy$1 = levelOneCopy$2;

// Define
var add$2 = function (cache, type, index, element) {
  if (cache[type]) {
    if (element instanceof Object) {
      element = levelOneCopy$1(element);
    }
    cache[type].items[index] = { item: element, time: Date.now() / 1000 };
  } else {
    return 'Invalid type'
  }
};

// Includes
const levelOneCopy = levelOneCopy$2;

// Define
var get$2 = function (cache, type, index) {
  if (cache[type]) {
    const group = cache[type];
    const cached = group.items[index];
    if (cached && cached.time) {
      let passed;
      if (!group.permanent) {
        passed = Date.now() / 1000 - cached.time;
        if (passed > group.expire) {
          return false
        }
      }
      let item = cached.item;
      if (item instanceof Object) {
        item = levelOneCopy(item);
      }
      return [item, (group.refresh && ((group.refresh === true && true) || passed > group.refresh))]
    } else {
      return false
    }
  } else {
    return 'Invalid type'
  }
};

// Includes
const add$1 = add$2;
const get$1 = get$2;

// Define
var addIf$2 = function (cache, type, index, callbacks) {
  const got = get$1(cache, type, index);
  const item = got[0];
  const refresh = got[1];
  if (item) {
    callbacks.done(item);
    if (refresh) {
      const group = cache[type];
      group.refresh = false;
      callbacks.add(function (element) {
        group.refresh = true;
        add$1(cache, type, index, element);
      });
    }
  } else {
    callbacks.add(function (element) {
      add$1(cache, type, index, element);
      callbacks.done(element);
    });
  }
};

// Define
var clear$1 = function (cache, type, index) {
  if (cache[type]) {
    cache[type].items[index].time = null;
  } else {
    return 'Invalid type'
  }
};

// Includes
const addIf$1 = addIf$2;
const options$5 = options$6;

// Define
function wrap$2 (type, index, func) {
  const cache = options$5.cache;
  const group = cache[type];
  if (group.expire > 0 || group.permanent) {
    return new Promise(function (resolve, reject) {
      addIf$1(cache, type, index, {
        done: resolve,
        add: function (done) {
          return func().then(done).catch(reject)
        }
      });
    })
  } else {
    return func()
  }
}

var wrap_1 = function (type, index, func) {
  return wrap$2(type, index, func)
};

// Includes
const newCache = _new;
const add = add$2;
const addIf = addIf$2;
const get = get$2;
const clear = clear$1;
const wrap$1 = wrap_1;

// Define
var cache$a = {
  new: newCache,
  add,
  clear,
  addIf,
  get,
  wrap: wrap$1
};

var getHash$2 = {};

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(crypto$3);

var getSession$2 = {};

// Includes
const settings$9 = require$$196;
const options$4 = options$6;

// Args
getSession$2.optional = ['jar'];

// Docs
/**
 * 🔐 Get the .ROBLOSECURITY cookie from the jar.
 * @category Utility
 * @alias getSession
 * @param {CookieJar=} jar - The cookie jar containing the .ROBLOSECURITY cookie.
 * @returns {string}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * const cookie = await noblox.getSession()
**/

// Define
getSession$2.func = function (args) {
  const jar = args.jar || options$4.jar;
  if (settings$9.session_only) {
    if (typeof jar === 'string') {
      return jar
    }
    return jar.session
  } else {
    const cookies = jar.getCookies('https://roblox.com');
    for (let i = 0; i < cookies.length; i++) {
      const element = cookies[i];
      if (element.key === '.ROBLOSECURITY') {
        return element.value
      }
    }
    return ''
  }
};

// Dependencies
const crypto$2 = require$$1;

// Includes
const getSession$1 = getSession$2.func;

// Args
getHash$2.optional = ['jar'];

// Docs
/**
 * 🔐 Get a unique hash for the given jar. Used to cache items that depend on session.
 * @category Utility
 * @alias getHash
 * @param {CookieJar} jar - The audit log action row.
 * @returns {string}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * const hash = noblox.getHash()
**/

// Define
getHash$2.func = function ({ jar }) {
  if (typeof jar === 'string') {
    jar = { session: jar };
  }
  const session = getSession$1({ jar });
  return crypto$2.createHash('md5').update(session).digest('hex')
};

(function (exports$1) {
	// Dependencies
	const util = require$$0$4;
	let request = util.promisify(require$$1$1);

	// Includes
	const options = options$6;
	const settings = require$$196;
	const cache = cache$a;
	const getHash = getHash$2.func;

	// Args
	exports$1.required = ['url'];
	exports$1.optional = ['options', 'ignoreLoginError'];

	// Define
	request = request.defaults({
	  forever: true,
	  agentOptions: {
	    maxSockets: Infinity
	  },
	  simple: false,
	  gzip: true,
	  timeout: settings.timeout
	});

	// Docs
	/**
	 * ✅ Send an http request to url with options.
	 * @category Utility
	 * @alias http
	 * @param {string} url - The url to request to.
	 * @param {object} options - The options to send with the request.
	 * @param {boolean} ignoreLoginError - If any login errors should be ignored.
	 * @returns {Promise<string>}
	 * @example const noblox = require("noblox.js")
	 * const body = await noblox.http("https://roblox.com/login", { method: "GET" })
	**/

	function http (url, opt) {
	  if (opt?.headers) {
	    opt.headers = Object.fromEntries(
	      Object.entries(opt.headers).map(([k, v]) => [k.toLowerCase(), v])
	    );
	  }
	  if (opt && !opt.jar && Object.keys(opt).indexOf('jar') > -1) {
	    opt.jar = options.jar;
	  }
	  if (settings.session_only && opt && opt.jar) {
	    if (!opt.headers) {
	      opt.headers = {};
	    }
	    opt.headers.cookie = '.ROBLOSECURITY=' + opt.jar.session + ';';
	    opt.headers['x-api-key'] = opt.jar.apiKey;
	    opt.jar = null;
	  }
	  if (opt && opt.verification) {
	    if (!opt.headers) {
	      opt.headers = {};
	    }
	    const verify = '__RequestVerificationToken=' + opt.verification + ';';
	    if (opt.headers.cookie) {
	      opt.headers.cookie += verify;
	    } else {
	      opt.headers.cookie = verify;
	    }
	  }
	  if (url.indexOf('http') !== 0) {
	    url = 'https:' + url;
	  }
	  return request(url, opt)
	}

	exports$1.func = function (args) {
	  const opt = args.options || {};
	  if (typeof opt.jar === 'string') {
	    opt.jar = { session: opt.jar };
	  }
	  const jar = opt.jar;
	  const depth = args.depth || 0;
	  const full = opt.resolveWithFullResponse || false;
	  opt.resolveWithFullResponse = true;
	  const follow = opt.followRedirect === undefined || opt.followRedirect;
	  opt.followRedirect = function (res) {
	    if (!args.ignoreLoginError && res.headers.location && (res.headers.location.startsWith('https://www.roblox.com/newlogin') || res.headers.location.startsWith('/Login/Default.aspx'))) {
	      return false
	    }
	    return follow
	  };
	  return http(args.url, opt).then(function (res) {
	    if (res.statusCode === 403 && res.headers['x-csrf-token'] && Object.hasOwn(opt.headers ?? {}, 'x-csrf-token')) {
	      if (depth >= 2) {
	        throw new Error('Tried ' + (depth + 1) + ' times and could not refresh XCSRF token successfully')
	      }

	      const token = res.headers['x-csrf-token'];

	      if (token) {
	        opt.headers['x-csrf-token'] = token;
	        opt.jar = jar;
	        args.depth = depth + 1;
	        return exports$1.func(args)
	      } else {
	        throw new Error('Could not refresh X-CSRF-TOKEN')
	      }
	    } else {
	      if (depth > 0) {
	        cache.add(options.cache, 'XCSRF', getHash({ jar }), opt.headers['x-csrf-token']);
	      }
	    }
	    if (res.statusCode === 302 && !args.ignoreLoginError && res.headers.location && (res.headers.location.startsWith('https://www.roblox.com/newlogin') || res.headers.location.startsWith('/Login/Default.aspx'))) {
	      throw new Error('You are not logged in')
	    }
	    return full ? res : res.body
	  })
	}; 
} (http$1_));

// Includes
const http$1Z = http$1_.func;

// Args
getUserSocialLinks$1.required = ['userId'];
getUserSocialLinks$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get the social link data (promotion channels) associated with a user.
 * @category AccountInformation
 * @alias getUserSocialLinks
 * @param {number} userId - The id of the user.
 * @returns {Promise<PromotionChannelsResponse>}
 * @example const noblox = require("noblox.js")
 * const userSocialLinks = await noblox.getUserSocialLinks(2416399685)
**/

// Define
function getUserSocialLinks (userId, jar) {
  return http$1Z({
    url: `//accountinformation.roblox.com/v1/users/${userId}/promotion-channels`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors } = JSON.parse(body);
      if (statusCode === 200) {
        return JSON.parse(body)
      } else if (statusCode === 400) {
        throw new Error(`${errors[0].message} | userId: ${userId}`)
      } else {
        throw new Error(`An unknown error occurred with getUserSocialLinks() | [${statusCode}] userId: ${userId}`)
      }
    })
}

getUserSocialLinks$1.func = function ({ userId, jar }) {
  return getUserSocialLinks(userId, jar)
};

var block$1 = {};

var getGeneralToken$P = {};

// Includes
const getHash$1 = getHash$2.func;
const http$1Y = http$1_.func;
const cache$9 = cache$a;
const options$3 = options$6;

// Args
getGeneralToken$P.optional = ['jar'];

// Docs
/**
 * 🔐 Generate an X-CSRF-Token.
 * @category Utility
 * @alias getGeneralToken
 * @param {CookieJar=} jar - The jar containing the .ROBLOSECURITY token.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * const XCSRF = await noblox.getGeneralToken()
**/

// Define
function getGeneralToken$O (jar) {
  if (!jar && !options$3.jar.session) {
    throw new Error('Cannot get CSRF: You are not logged in.')
  }
  const httpOpt = {
    // This will never actually sign you out because an X-CSRF-TOKEN isn't provided, only received
    url: '//auth.roblox.com/v2/logout', // REQUIRES https. Thanks for letting me know, ROBLOX...
    options: {
      resolveWithFullResponse: true,
      method: 'POST',
      jar
    }
  };
  return http$1Y(httpOpt)
    .then(function (res) {
      const xcsrf = res.headers['x-csrf-token'];
      if (xcsrf) {
        return xcsrf
      } else {
        throw new Error('Did not receive X-CSRF-TOKEN')
      }
    })
}

getGeneralToken$P.func = function (args) {
  const jar = args.jar;
  return cache$9.wrap('XCSRF', getHash$1({ jar }), function () {
    return getGeneralToken$O(jar)
  })
};

// Includes
const http$1X = http$1_.func;
const getGeneralToken$N = getGeneralToken$P.func;

// Args
block$1.required = ['userId'];
block$1.optional = ['jar'];

// Docs
/**
 * 🔐 Block a user.
 * @category AccountSettings
 * @alias block
 * @param {number} userId - The id of the user that is being blocked.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.block(123456)
**/

// Define
function block (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//accountsettings.roblox.com/v1/users/${userId}/block`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$1X(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

block$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$N({ jar })
    .then(function (xcsrf) {
      return block(jar, xcsrf, args.userId)
    })
};

var unblock$1 = {};

// Includes
const http$1W = http$1_.func;
const getGeneralToken$M = getGeneralToken$P.func;

// Args
unblock$1.required = ['userId'];
unblock$1.optional = ['jar'];

// Docs
/**
 * 🔐 Unblock a user.
 * @category AccountSettings
 * @alias unblock
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.unblock(123456)
**/

// Define
function unblock (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//accountsettings.roblox.com/v1/users/${userId}/unblock`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$1W(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

unblock$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$M({ jar })
    .then(function (xcsrf) {
      return unblock(jar, xcsrf, args.userId)
    })
};

var deleteFromInventory$1 = {};

// Includes
const http$1V = http$1_.func;
const getGeneralToken$L = getGeneralToken$P.func;

// Args
deleteFromInventory$1.required = ['assetId'];
deleteFromInventory$1.optional = ['jar'];

// Docs
/**
 * 🔐 Removes an asset from the authenticated user's inventory; throws an error if the item is not owned.
 * @category Asset
 * @alias deleteFromInventory
 * @param {number} assetId - The id of the asset.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * await noblox.deleteFromInventory(144075659)
**/

// Define
function deleteFromInventory (jar, assetId, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://inventory.roblox.com/v2/inventory/asset/${assetId}`,
      options: {
        method: 'DELETE',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf,
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    };

    return http$1V(httpOpt)
      .then(function (res) {
        const responseData = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        // Roblox likes to error here with 200 status codes too with inconsistency
        if (res.statusCode === 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && !responseData.isValid) {
            error = responseData.error;
            reject(new Error(error));
          } else if (responseData && responseData.isValid) {
            resolve();
          }
        } else {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        }
      })
      .catch(error => reject(error))
  })
}

// Define
deleteFromInventory$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$L({ jar })
    .then(function (xcsrf) {
      return deleteFromInventory(jar, args.assetId, xcsrf)
    })
};

var getGamePassProductInfo$1 = {};

// Includes
const http$1U = http$1_.func;
const cache$8 = cache$a;

// Args
getGamePassProductInfo$1.required = ['gamepass'];

// Docs
/**
 * ✅ Get the info of an gamepass.
 * @category Asset
 * @param {number} gamePassId - The id of the asset.
 * @returns {Promise<GamePassProductInfo>}
 * @example const noblox = require("noblox.js")
 * const gamePassInfo = await noblox.getGamePassProductInfo(2919875)
**/

// Define
function getGamePassProductInfo (gamepass) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/game-passes/v1/game-passes/${gamepass}/product-info`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET'
      }
    };

    return http$1U(httpOpt)
      .then(function (res) {
        const data = JSON.parse(res.body);

        if (res.statusCode === 200) {
          resolve(data);
        } else {
          const errors = data.errors.map((e) => e.message);

          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
        }
      })
      .catch(error => reject(error))
  })
}

getGamePassProductInfo$1.func = function (args) {
  const gamepass = args.gamepass;

  return cache$8.wrap('GamePassProduct', gamepass, function () {
    return getGamePassProductInfo(gamepass)
  })
};

var getProductInfo$2 = {};

// Includes
const http$1T = http$1_.func;
const cache$7 = cache$a;

// Args
getProductInfo$2.required = ['asset'];

// Docs
/**
 * ✅ Get the info of an asset.
 * @category Asset
 * @param {number} assetId - The id of the asset.
 * @returns {Promise<ProductInfo>}
 * @example const noblox = require("noblox.js")
 * const productInfo = await noblox.getProductInfo(1117747196)
**/

// Define
function getProductInfo$1 (asset) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//economy.roblox.com/v2/assets/${asset}/details`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET'
      }
    };
    return http$1T(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body));
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          const body = isAnObject(res.body) ? JSON.parse(res.body) : {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      })
      .catch(error => reject(error))
  })
}

getProductInfo$2.func = function (args) {
  const asset = args.asset;
  return cache$7.wrap('Product', asset, function () {
    return getProductInfo$1(asset)
  })
};

var uploadAnimation = {};

var configureItem$1 = {};

// Includes
const http$1S = http$1_.func;
const getGeneralToken$K = getGeneralToken$P.func;

// Args
configureItem$1.required = ['id', 'name', 'description'];
configureItem$1.optional = ['enableComments', 'sellForRobux', 'genreSelection', 'jar'];

// Docs
/**
 * 🔐 Configure an asset.
 * @category Develop
 * @alias configureItem
 * @param {number} assetId - The id of the asset.
 * @param {string} name - The new name of the asset.
 * @param {string} description - The new description of the asset.
 * @param {boolean=} enableComments - Enable comments on your asset.
 * @param {number|boolean=} [sellForRobux=false] - The amount of robux to sell for; use a number for sellable assets, boolean for copyable assets
 * @param {string=} [genreSelection="All"] - The genre of your asset.
 * @returns {Promise<ConfigureItemResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.configureItem(1117747196, "Item", "A cool item.", false, 100)
**/

// Define
function configure (jar, token, id, name, description, enableComments, sellForRobux, genreSelection, sellingPrice) {
  return http$1S({
    url: '//develop.roblox.com/v1/assets/' + id,
    options: {
      method: 'PATCH',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        name,
        description,
        enableComments,
        genres: genreSelection || ['All'],
        isCopyingAllowed: typeof (sellForRobux) === 'boolean' ? sellForRobux : null
      }
    }
  }).then(function (json) {
    if (!json.errors) {
      const response = {
        name,
        description,
        assetId: id
      };
      if (typeof sellForRobux === 'boolean') {
        response.isCopyingAllowed = sellForRobux;
      } else {
        response.price = sellingPrice || 0;
      }
      return response
    } else {
      if (json.errors[0].code === 13) { // "Only a marketplace asset can be updated with IsCopyingAllowed."
        throw new Error('Attempting to make a sellable asset copyable; it must be sold for robux. (Use a number for sellForRobux.)')
      }
      throw new Error(json.errors[0].message)
    }
  })
}

function configureRobux$1 (args) {
  return http$1S({
    url: '//itemconfiguration.roblox.com/v1/assets/' + args.id + '/release',
    options: {
      method: 'POST',
      jar: args.jar,
      headers: {
        'X-CSRF-TOKEN': args.token
      },
      json: {
        saleStatus: args.sellForRobux ? 'OnSale' : 'OffSale',
        priceConfiguration: {
          priceInRobux: args.sellForRobux || 0
        }
      }
    }
  })
    .then(function (json) {
      if (!json.errors) {
        return configure(args.jar, args.token, args.id, args.name, args.description, args.enableComments, args.sellForRobux, args.genreSelection, args.sellForRobux)
      } else {
        // Code 6: "Asset is released"; caused when changing the price of an on-sale asset from non-zero to non-zero
        if (json.errors[0].code === 6) {
          return http$1S({
            url: '//itemconfiguration.roblox.com/v1/assets/' + args.id + '/update-price',
            options: {
              method: 'POST',
              jar: args.jar,
              headers: {
                'X-CSRF-TOKEN': args.token
              },
              json: {
                priceConfiguration: {
                  priceInRobux: args.sellForRobux
                }
              }
            }
          }).then((err) => {
            if (!err.errors) {
              return configure(args.jar, args.token, args.id, args.name, args.description, args.enableComments, args.sellForRobux, args.genreSelection, args.sellForRobux)
            } else {
              throw new Error(json.errors[0].message)
            }
          })
        } else if (json.errors[0].code === 3) { // "Cannot release the associated asset type" - caused by copyable asset using sellForRobux: 2 or greater
          // Throw an error as the developer may have intended to sell the asset for robux instead of making it free.
          throw new Error('Attempting to sell a copyable asset for robux; it can only be made free. (Use true for sellForRobux.)')
        } else if (json.errors[0].code === 20) { // "Cannot set the associated asset type to remove-from-release" - caused by copyable asset using sellForRobux: 0
          // Continue and ignore the error as the intended outcome makes the asset private; set sellForRobux from 0 to false
          return configure(args.jar, args.token, args.id, args.name, args.description, args.enableComments, args.sellForRobux, args.genreSelection, !!args.sellForRobux)
        } else if (json.errors[0].code === 37) { // "AssetIsLimited" - Use the newer endpoint to update price and sale status
          return http$1S({
            url: '//catalog.roblox.com/v1/catalog/items/details',
            options: {
              method: 'POST',
              jar: args.jar,
              json: {
                items: [
                  {
                    id: args.id,
                    itemType: 1
                  }
                ]
              },
              resolveWithFullResponse: true
            }
          }).then((response) => {
            if (!response.ok) throw new Error(response.body)

            const { collectibleItemId, price } = JSON.parse(response.body);

            if (!collectibleItemId) throw new Error(`The publishing fee for asset ${args.id} has not been paid, you must do this in order to change or set the price.`)

            return http$1S({
              url: `//itemconfiguration.roblox.com/v1/collectibles/${collectibleItemId}`,
              options: {
                method: 'PATCH',
                jar: args.jar,
                headers: {
                  'X-CSRF-Token': args.token
                },
                json: {
                  isFree: false,
                  priceInRobux: args.sellForRobux || price,
                  priceOffset: 0,
                  quantityLimitPerUser: 0,
                  resaleRestriction: 2,
                  saleLocationConfiguration: {
                    places: [],
                    saleLocationType: 1
                  },
                  saleStatus: args.sellForRobux > 0 ? 0 : 1
                },
                resolveWithFullResponse: true
              }
            }).then((response) => {
              if (!response.ok) throw new Error(response.body)

              return {
                name: args.name,
                assetId: args.id,
                description: args.description,
                price: args.sellForRobux,
                isCopyingAllowed: null
              }
            })
          })
        } else if (json.errors[0].code === 40) { // "Use collecibles publishing endpoint." - Publishing fee has not been paid for this asset
          throw new Error(`The publishing fee for asset ${args.id} has not been paid, you must pay the fee before setting or updating the price.`)
        }
        throw new Error(`An unknown error occurred: [${json.errors[0].code}] ${json.errors[0].message}`)
      }
    })
}

function runWithToken$3 (args) {
  const jar = args.jar;
  return getGeneralToken$K({
    jar
  })
    .then(function (token) {
      if (typeof (args.sellForRobux) === 'number') {
        if (args.sellForRobux < 2 && args.sellForRobux !== 0) {
          throw new Error('Assets cannot be sold for less than 2R.')
        }
        args.token = token;
        return configureRobux$1(args)
      } else {
        return configure(args.jar, token, args.id, args.name, args.description, args.enableComments, args.sellForRobux, args.genreSelection)
      }
    })
}

configureItem$1.func = function (args) {
  return runWithToken$3(args)
};

// Includes
const http$1R = http$1_.func;
const getGeneralToken$J = getGeneralToken$P.func;
const configureItem = configureItem$1.func;

// Args
uploadAnimation.required = ['data'];
uploadAnimation.optional = ['itemOptions', 'assetId', 'jar'];

// Docs
/**
 * 🔐 Upload an animation, either as a new asset or by overwriting an existing animation.
 * @category Asset
 * @alias uploadAnimation
 * @param {string | Stream} data - The rbxm file containing the KeyframeSequence.
 * @param {object=} itemOptions - The options for the upload. Only optional if assetId is not provided.
 * @param {string=} itemOptions.name - The name of the animation.
 * @param {string=} itemOptions.description - The description for the animation.
 * @param {boolean=} itemOptions.copyLocked - If the animation is copy-locked.
 * @param {boolean=} itemOptions.allowComments - If comments are allowed.
 * @param {number=} itemOptions.groupId - The group to upload the animation to. This is ignored if the assetId is provided.
 * @param {number=} assetId - An existing assetId to overwrite.
 * @returns {Promise<number>}
 * @example const noblox = require("noblox.js")
 * const fs = require("fs")
 * // Login using your cookie
 * const assetId = await noblox.uploadAnimation(fs.readFileSync("./KeyframeSequence.rbxm"), {
 *  name: "A cool animation",
 *  description: "This is a very cool animation",
 *  copyLocked: false, //The asset is allowed to be copied.
 *  allowComments: false
 * }, 7132858975)
**/

// Define
function upload$1 (data, itemOptions, assetId, jar, token) {
  const httpOpt = {
    url: assetId ? `//www.roblox.com/ide/publish/uploadexistinganimation?assetID=${assetId}&isGamesAsset=False` : '//www.roblox.com/ide/publish/uploadnewanimation?AllID=1',
    options: {
      resolveWithFullResponse: true,
      method: 'POST',
      jar,
      body: data,
      headers: {
        'X-CSRF-TOKEN': token,
        'Content-Type': 'application/xml',
        'User-Agent': 'RobloxStudio/WinInet RobloxApp/0.483.1.425021 (GlobalDist; RobloxDirectDownload)'
      }
    }
  };

  if (!assetId && itemOptions) {
    const copyLocked = itemOptions.copyLocked;
    const allowComments = itemOptions.allowComments;
    httpOpt.url += '&assetTypeName=Animation&genreTypeId=1&name=' +
      itemOptions.name +
      '&description=' +
      (itemOptions.description || '') +
      '&ispublic=' +
      (copyLocked != null ? !copyLocked : false) +
      '&allowComments=' +
      (allowComments != null ? allowComments : true) +
      '&groupId=' +
      (itemOptions.groupId || '');
  } else if (!assetId) {
    throw new Error('ItemOptions is required for new assets.')
  }

  return http$1R(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        const resultId = assetId || Number(res.body);

        if (assetId && itemOptions) {
          const copyLocked = itemOptions.copyLocked;
          const allowComments = itemOptions.allowComments;

          return configureItem({
            id: resultId,
            name: itemOptions.name,
            description: itemOptions.description,
            enableComments: (allowComments != null ? allowComments : true),
            sellForRobux: (copyLocked != null ? !copyLocked : false)
          }).then(function () {
            return resultId
          })
        } else {
          return resultId
        }
      } else {
        throw new Error('Animation upload failed, confirm that all item options, asset options, and upload data are valid.')
      }
    })
}

uploadAnimation.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$J({
    jar
  }).then(function (token) {
    return upload$1(args.data, args.itemOptions, args.assetId, args.jar, token)
  })
};

var uploadItem$1 = {};

var getVerification$3 = {};

var getVerificationInputs$1 = {};

const require$$0$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cheerio);

// Dependencies
const parser$1 = require$$0$3;

// Args
getVerificationInputs$1.required = [['html', 'selector']];

// Docs
/**
 * ✅ Get the verification inputs from the html.
 * @category Utility
 * @alias getVerificationInputs
 * @param {string | function} html | selector - The html to search or the cheerio selector to use.
 * @returns {Inputs}
 * @example const noblox = require("noblox.js")
 * const inputs = noblox.getVerificationInputs("htmlstuff")
**/

// Define
getVerificationInputs$1.func = function (args) {
  let $ = args.selector;
  if (!$) {
    $ = parser$1.load(args.html);
  }
  const inputs = {};
  const find = ['__VIEWSTATE', '__VIEWSTATEGENERATOR', '__EVENTVALIDATION', '__RequestVerificationToken'];
  for (let i = 0; i < find.length; i++) {
    const get = find[i];
    inputs[get] = $('input[name=' + get + ']').val();
  }
  return inputs
};

const require$$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(url);

// Includes
const http$1Q = http$1_.func;
const getHash = getHash$2.func;
const getVerificationInputs = getVerificationInputs$1.func;
const cache$6 = cache$a;
const URL = require$$4.URL;

// Args
getVerification$3.required = ['url'];
getVerification$3.optional = ['ignoreCache', 'getBody', 'jar'];

// Docs
/**
 * 🔐 Get the RequestVerificationToken from a url.
 * @category Utility
 * @alias getVerification
 * @param {string} url - The url to get the token from.
 * @param {boolean=} [ignoreCache=false] - Determines whether the cache be ignored or not.
 * @param {boolean=} [getBody=false] - If the body and inputs should be returned in an object
 * @param {CookieJar=} jar - The CookieJar containing the .ROBLOSECURITY cookie.
 * @returns {Promise<GetVerificationResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * const verificationTokenInfo = await noblox.getVerification()
**/

// Define
function getVerification$2 (jar, url, getBody) {
  const httpOpt = {
    url,
    options: {
      resolveWithFullResponse: true,
      jar
    }
  };
  return http$1Q(httpOpt)
    .then(function (res) {
      const inputs = getVerificationInputs({ html: res.body });
      let match;
      if (res.headers && res.headers['set-cookie']) {
        match = res.headers['set-cookie'].toString().match(/__RequestVerificationToken=(.*?);/);
      }
      return {
        body: (getBody ? res.body : null),
        inputs,
        header: match && match[1]
      }
    })
}

getVerification$3.func = function (args) {
  const jar = args.jar;
  if (args.ignoreCache) {
    return getVerification$2(jar, args.url, args.getBody)
  } else {
    return cache$6.wrap('Verify', new URL(args.url).pathname + getHash({ jar }), function () {
      return getVerification$2(jar, args.url, args.getBody)
    })
  }
};

// Includes
const http$1P = http$1_.func;
const getVerification$1 = getVerification$3.func;

// Args
uploadItem$1.required = ['name', 'assetType', 'file'];
uploadItem$1.optional = ['groupId', 'jar'];

// Docs
/**
 * 🔐 Upload an item.
 * @category Asset
 * @alias uploadItem
 * @param {string} name - The name of the asset.
 * @param {number} assetType - The [id for the asset type]{@link https://developer.roblox.com/en-us/api-reference/enum/AssetType}.
 * @param {ReadStream} file - The read stream for the asset being uploaded.
 * @param {number=} groupId - The group to upload the asset to.
 * @returns {Promise<UploadItemResponse>}
 * @example const noblox = require("noblox.js")
 * const fs = require("fs")
 * // Login using your cookie
 * await noblox.uploadItem("A cool decal.", 13, fs.createReadStream("./Image.png"))
**/

// Define
function uploadItem (jar, file, name, assetType, groupId) {
  return new Promise((resolve, reject) => {
    return getVerification$1({
      url: 'https://www.roblox.com/build/upload',
      options: {
        jar
      }
    }).then(function (ver) {
      const data = {
        name,
        assetTypeId: assetType,
        groupId: groupId || '',
        __RequestVerificationToken: ver.inputs.__RequestVerificationToken,
        file: {
          value: file,
          options: {
            filename: 'Image.png',
            contentType: 'image/png'
          }
        }
      };
      return http$1P({
        url: '//www.roblox.com/build/upload',
        options: {
          method: 'POST',
          verification: ver.header,
          formData: data,
          resolveWithFullResponse: true,
          jar
        }
      }).then(function (res) {
        if (res.statusCode === 302) {
          const location = res.headers.location;
          const errMsg = location.match('uploadedId=(.*)$');
          const match = location.match(/\d+$/);
          if (match) {
            const id = parseInt(match[0], 10);
            if (location.indexOf('/build/upload') === -1) {
              reject(new Error('Unknown redirect: ' + location));
            }
            resolve(id);
          } else if (errMsg) {
            reject(new Error('Upload error: ' + decodeURI(errMsg[1])));
          } else {
            reject(new Error('Match error. Original: ' + location));
          }
        } else {
          reject(new Error('Unknown upload error'));
        }
      })
    })
      .catch(error => reject(error))
  })
}

uploadItem$1.func = function (args) {
  return uploadItem(args.jar, args.file, args.name, args.assetType, args.groupId)
};

var uploadModel = {};

// Includes
const http$1O = http$1_.func;
const getGeneralToken$I = getGeneralToken$P.func;

// Args
uploadModel.required = ['data'];
uploadModel.optional = ['itemOptions', 'assetId', 'jar'];

// Docs
/**
 * 🔐 Upload a model.
 * @category Asset
 * @alias uploadModel
 * @param {string | Stream} data - The model data.
 * @param {object=} itemOptions - The options for the upload.
 * @param {string=} itemOptions.name - The name of the model.
 * @param {string=} itemOptions.description - The description for the model.
 * @param {boolean=} itemOptions.copyLocked - If the model is copy-locked.
 * @param {boolean=} itemOptions.allowComments - If comments are allowed.
 * @param {number=} itemOptions.groupId - The group to upload the model to.
 * @param {number=} assetId - An existing assetId to overwrite.
 * @returns {Promise<UploadModelResponse>}
 * @example const noblox = require("noblox.js")
 * const fs = require("fs")
 * // Login using your cookie
 * noblox.uploadModel(fs.readFileSync("./model.rbxm"), {
 *  name: "A cool model",
 *  description: "This is a very cool model",
 *  copyLocked: false, //The asset is allowed to be copied.
 *  allowComments: false,
 *  groupId: 1
 * }, 1117747196)
**/

// Define
function upload (data, itemOptions, assetId, jar, token) {
  const httpOpt = {
    url: '//data.roblox.com/Data/Upload.ashx?json=1&assetid=' + (assetId || 0),
    options: {
      resolveWithFullResponse: true,
      method: 'POST',
      jar,
      body: data,
      headers: {
        'X-CSRF-TOKEN': token,
        'Content-Type': 'application/xml'
      }
    }
  };
  if (itemOptions) {
    const copyLocked = itemOptions.copyLocked;
    const allowComments = itemOptions.allowComments;
    httpOpt.url += '&type=Model&genreTypeId=1&name=' +
      itemOptions.name +
      '&description=' +
      (itemOptions.description || '') +
      '&ispublic=' +
      (copyLocked != null ? !copyLocked : false) +
      '&allowComments=' +
      (allowComments != null ? allowComments : true) +
      '&groupId=' +
      (itemOptions.groupId || '');
  } else if (!assetId) {
    throw new Error('ItemOptions is required for new assets.')
  }
  return http$1O(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        const body = res.body;
        let parsed;
        try {
          parsed = JSON.parse(body);
        } catch (e) {
          throw new Error('Could not parse JSON, returned body:' + body)
        }
        return parsed
      } else {
        throw new Error('Upload failed, confirm that all item options, asset options, and upload data are valid.')
      }
    })
}

uploadModel.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$I({
    jar
  }).then(function (token) {
    return upload(args.data, args.itemOptions, args.assetId, args.jar, token)
  })
};

var avatarRules = {};

const http$1N = http$1_.func;

avatarRules.optional = ['option', 'jar'];

// Docs
/**
 * ✅ Get the avatar rules.
 * @category Avatar
 * @alias avatarRules
 * @param {string=} option - A specific rule to filter for.
 * @returns {Promise<AvatarRules>}
 * @example const noblox = require("noblox.js")
 * const avatarRules = await noblox.avatarRules()
**/

avatarRules.func = (args) => {
  const jar = args.jar;
  const option = args.option;

  return http$1N({
    url: '//avatar.roblox.com/v1/avatar-rules',
    options: {
      method: 'GET',
      jar,
      followRedirect: false,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      const json = JSON.parse(res.body);
      const result = (option ? json[option] : json);

      return result
    } else {
      throw new Error('Error fetching avatar rules')
    }
  })
};

var currentlyWearing = {};

const http$1M = http$1_.func;

currentlyWearing.required = ['userId'];

// Docs
/**
 * ✅ Get the assets a given user is wearing.
 * @category Avatar
 * @alias currentlyWearing
 * @param {number} userId - The user's userId.
 * @returns {Promise<AssetIdList>}
 * @example const noblox = require("noblox.js")
 * const wearingAssets = await noblox.currentlyWearing(1)
**/

currentlyWearing.func = (args) => {
  const userId = args.userId;

  return http$1M({
    url: '//avatar.roblox.com/v1/users/' + userId + '/currently-wearing',
    options: {
      method: 'GET',
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      return JSON.parse(res.body)
    } else {
      throw new Error('User does not exist')
    }
  })
};

var getAvatar$1 = {};

const http$1L = http$1_.func;

getAvatar$1.required = ['userId'];

// Docs
/**
 * ✅ Get a user's avatar.
 * @category Avatar
 * @alias getAvatar
 * @param {number} userId - The user's userId.
 * @returns {Promise<AvatarInfo>}
 * @example const noblox = require("noblox.js")
 * const avatar = await noblox.getAvatar(1)
**/

const getAvatar = (userId) => {
  return http$1L({
    url: '//avatar.roblox.com/v1/users/' + userId + '/avatar',
    options: {
      method: 'GET',
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      return JSON.parse(res.body)
    } else {
      throw new Error('User does not exist')
    }
  })
};

getAvatar$1.func = (args) => {
  const userId = args.userId;
  return getAvatar(userId)
};

var getCurrentAvatar = {};

const http$1K = http$1_.func;

getCurrentAvatar.optional = ['option', 'jar'];

// Docs
/**
 * 🔐 Gets your current avatar.
 * @category Avatar
 * @alias getCurrentAvatar
 * @param {number=} option - The name of a parameter on the avatar.
 * @returns {Promise<AvatarInfo>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const avatar = await noblox.getCurrentAvatar()
*/

getCurrentAvatar.func = (args) => {
  const jar = args.jar;
  const option = args.option;

  return http$1K({
    url: '//avatar.roblox.com/v1/avatar',
    options: {
      method: 'GET',
      jar,
      followRedirect: false,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      const json = JSON.parse(res.body);
      return (option ? json[option] : json)
    }
  })
};

var getRecentItems = {};

const http$1J = http$1_.func;

getRecentItems.optional = ['listType', 'jar'];

// Docs
/**
 * 🔐 Get assets you've recently worn.
 * @category Avatar
 * @alias getRecentItems
 * @param {number=} listType - A type of item. Ex: Shirt, All
 * @returns {Promise<AssetRecentItemsResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const recentlyWorn = await noblox.getRecentItems("All")
**/

getRecentItems.func = (args) => {
  const jar = args.jar;
  const listType = typeof (args.listType) === 'string' ? args.listType : 'All';

  return http$1J({
    url: '//avatar.roblox.com/v1/recent-items/' + listType + '/list',
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 401) {
      throw new Error('You are not logged in')
    } else if (res.statusCode === 400) {
      throw new Error('Invalid list type')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var outfitDetails = {};

const http$1I = http$1_.func;

outfitDetails.required = ['outfitId'];

// Docs
/**
 * ✅ Get the details of an outfit.
 * @category Avatar
 * @alias outfitDetails
 * @param {number} outfitId - The id of the outfit.
 * @returns {Promise<AvatarOutfitDetails>}
 * @example const noblox = require("noblox.js")
 * const outfit = await noblox.outfitDetails(111)
**/

outfitDetails.func = (args) => {
  const outfitId = args.outfitId;

  return http$1I({
    url: '//avatar.roblox.com/v1/outfits/' + outfitId + '/details',
    options: {
      method: 'GET',
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      return JSON.parse(res.body)
    } else {
      throw new Error('Outfit does not exist')
    }
  })
};

var outfits = {};

const http$1H = http$1_.func;

outfits.required = ['userId'];
outfits.optional = ['page', 'itemsPerPage'];

// Docs
/**
 * ✅ Get a user's outfits.
 * @category Avatar
 * @alias outfits
 * @param {number} userId - The userId of the user.
 * @param {number=} page - The page to index.
 * @param {number=} itemsPerPage - The number of results on each page.
 * @returns {Promise<GetOutfitsResult>}
 * @example const noblox = require("noblox.js")
 * const outfits = await noblox.outfits(1)
**/

outfits.func = (args) => {
  const userId = args.userId;
  const page = parseInt(args.page) ? parseInt(args.page) : '*';
  const itemsPerPage = parseInt(args.itemsPerPage) ? parseInt(args.itemsPerPage) : '*';

  return http$1H({
    url: '//avatar.roblox.com/v1/users/' + userId + '/outfits?page=' + page + '&itemsPerPage=' + itemsPerPage,
    options: {
      method: 'GET',
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      return JSON.parse(res.body)
    } else {
      throw new Error('User does not exist')
    }
  })
};

var redrawAvatar$1 = {};

const http$1G = http$1_.func;
const getGeneralToken$H = getGeneralToken$P.func;

redrawAvatar$1.optional = ['jar'];

// Docs
/**
 * 🔐 Redraw your avatar.
 * @category Avatar
 * @alias redrawAvatar
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.redrawAvatar()
**/

function redrawAvatar (jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//avatar.roblox.com/v1/avatar/redraw-thumbnail',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$1G(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        resolve();
      } else if (res.statusCode === 429) {
        reject(new Error('Redraw avatar floodchecked'));
      } else {
        reject(new Error('Redraw avatar failed'));
      }
    }).catch(error => reject(error))
  })
}

redrawAvatar$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$H({ jar }).then((xcsrf) => {
    return redrawAvatar(jar, xcsrf)
  })
};

var removeAssetId$1 = {};

const http$1F = http$1_.func;
const getGeneralToken$G = getGeneralToken$P.func;

removeAssetId$1.required = ['assetId'];
removeAssetId$1.optional = ['jar'];

// Docs
/**
 * 🔐 Removes an asset from your avatar.
 * @category Avatar
 * @alias removeAssetId
 * @param {number} assetId - The assetId to remove.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.removeAssetId(1)
**/

function removeAssetId (assetId, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: 'https://avatar.roblox.com/v1/avatar/assets/' + assetId + '/remove',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        },
        resolveWithFullResponse: true
      }
    };

    return http$1F(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve();
        }
      }).catch(error => reject(error))
  })
}

removeAssetId$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$G({ jar }).then((xcsrf) => {
    return removeAssetId(args.assetId, jar, xcsrf)
  })
};

var setAvatarBodyColors = {};

const http$1E = http$1_.func;
const getGeneralToken$F = getGeneralToken$P.func;

setAvatarBodyColors.required = ['headColorId', 'torsoColorId', 'rightArmColorId', 'leftArmColorId', 'rightLegColorId', 'leftLegColorId'];
setAvatarBodyColors.optional = ['jar'];

// Docs
/**
 * 🔐 Set the colors of your avatar.
 * @category Avatar
 * @alias setAvatarBodyColors
 * @param {number} headColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the head.
 * @param {number} torsoColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the torso.
 * @param {number} rightArmColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the right arm.
 * @param {number} leftArmColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the left arm.
 * @param {number} rightLegColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the right leg.
 * @param {number} leftLegColorId - The [BrickColor Code]{@link https://developer.roblox.com/en-us/articles/BrickColor-Codes} of the left leg.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setAvatarBodyColors(125, 125, 125, 125, 125, 125)
**/

const nextFunction$8 = (jar, token, headColorId, torsoColorId, rightArmColorId, leftArmColorId, rightLegColorId, leftLegColorId) => {
  return http$1E({
    url: '//avatar.roblox.com/v1/avatar/set-body-colors',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        headColorId,
        torsoColorId,
        rightArmColorId,
        leftArmColorId,
        rightLegColorId,
        leftLegColorId
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.success) {
        throw new Error(res.body)
      }
    } else {
      throw new Error('Set body colors failed')
    }
  })
};

setAvatarBodyColors.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$F({ jar }).then((xcsrf) => {
    return nextFunction$8(jar, xcsrf, args.headColorId, args.torsoColorId, args.rightArmColorId, args.leftArmColorId, args.rightLegColorId, args.leftLegColorId)
  })
};

var setAvatarScales = {};

const http$1D = http$1_.func;
const getGeneralToken$E = getGeneralToken$P.func;

setAvatarScales.required = ['height', 'width', 'head'];
setAvatarScales.optional = ['depth', 'proportion', 'bodyType', 'jar'];

// Docs
/**
 * 🔐 Set the scale of your avatar.
 * @category Avatar
 * @alias setAvatarScales
 * @param {number} height - The height scale of the avatar.
 * @param {number} width - The width scale of the avatar.
 * @param {number} head - The head scale of the avatar.
 * @param {number=} depth - The depth scale of the avatar.
 * @param {number=} proportion - The proportion scale of the avatar.
 * @param {number=} bodyType - The body type scale of the avatar.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setAvatarScales(1, 1, 1, 1, 1, 1)
**/

const nextFunction$7 = (jar, token, height, width, head, depth, proportion, bodyType) => {
  return http$1D({
    url: '//avatar.roblox.com/v1/avatar/set-scales',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        height,
        width,
        head,
        depth,
        proportion,
        bodyType
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.success) {
        throw new Error(res.body)
      }
    } else {
      throw new Error('Set avatar scale failed')
    }
  })
};

setAvatarScales.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$E({ jar }).then((xcsrf) => {
    return nextFunction$7(jar, xcsrf, args.height, args.width, args.head, args.depth, args.proportion, args.bodyType)
  })
};

var setPlayerAvatarType = {};

const http$1C = http$1_.func;
const getGeneralToken$D = getGeneralToken$P.func;

setPlayerAvatarType.required = ['avatarType'];
setPlayerAvatarType.optional = ['jar'];

// Docs
/**
 * 🔐 Set the type of your avatar.
 * @category Avatar
 * @alias setPlayerAvatarType
 * @param {PlayerAvatarType} avatarType - The type of your avatar. (R6 or R15)
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setPlayerAvatarType("R6")
**/

const nextFunction$6 = (jar, token, avatarType) => {
  return http$1C({
    url: '//avatar.roblox.com/v1/avatar/set-player-avatar-type',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        playerAvatarType: avatarType
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.success) {
        throw new Error(res.body)
      }
    } else {
      throw new Error('Set avatar type failed')
    }
  })
};

setPlayerAvatarType.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$D({ jar }).then((xcsrf) => {
    return nextFunction$6(jar, xcsrf, args.avatarType)
  })
};

var setWearingAssets = {};

const http$1B = http$1_.func;
const getGeneralToken$C = getGeneralToken$P.func;

setWearingAssets.required = ['assetIds'];
setWearingAssets.optional = ['jar'];

// Docs
/**
 * 🔐 Set the assets your avatar is wearing.
 * @category Avatar
 * @alias setWearingAssets
 * @param {Array<number>} assetIds - An array of asset IDs to wear.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setWearingAssets([1, 2, 3])
**/

const nextFunction$5 = (jar, token, assetIds) => {
  return http$1B({
    url: '//avatar.roblox.com/v1/avatar/set-wearing-assets',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        assetIds
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.success) {
        throw new Error('Invalid assets: ' + res.body.invalidAssetIds.join(', '))
      }
    } else {
      throw new Error('Wear assets failed')
    }
  })
};

setWearingAssets.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$C({ jar }).then((xcsrf) => {
    return nextFunction$5(jar, xcsrf, args.assetIds)
  })
};

var wearAssetId$1 = {};

const http$1A = http$1_.func;
const getGeneralToken$B = getGeneralToken$P.func;

wearAssetId$1.required = ['assetId'];
wearAssetId$1.optional = ['jar'];

// Docs
/**
 * 🔐 Wear a specific asset.
 * @category Avatar
 * @alias wearAssetId
 * @param {number} assetId - The assetId to wear.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.wearAssetId(1117747196)
**/

function wearAssetId (assetId, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: 'https://avatar.roblox.com/v1/avatar/assets/' + assetId + '/wear',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        },
        resolveWithFullResponse: true
      }
    };

    return http$1A(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve();
        }
      }).catch(error => reject(error))
  })
}

wearAssetId$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$B({ jar }).then((xcsrf) => {
    return wearAssetId(args.assetId, jar, xcsrf)
  })
};

var getAwardedTimestamps$1 = {};

// Includes
const http$1z = http$1_.func;

// Args
getAwardedTimestamps$1.required = ['userId', 'badgeId'];

// Docs
/**
 * ✅ Get the time the badge was awarded to a user.
 * @category Badges
 * @alias getAwardedTimestamps
 * @param {number} userId - The userId of the user.
 * @param {Array<number>} badgeId - The ids of the badges.
 * @returns {Promise<UserBadgeStats>}
 * @example const noblox = require("noblox.js")
 * const badges = await noblox.getAwardedTimestamps(1, [1, 2, 3])
**/

// Define
const getAwardedTimestamps = (userId, badgeId) => {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://badges.roblox.com/v1/users/${userId}/badges/awarded-dates?badgeIds=${badgeId.join(',')}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true
      }
    };

    return http$1z(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve(responseData);
        }
      })
  })
};

getAwardedTimestamps$1.func = async (args) => {
  if (isNaN(args.userId)) {
    throw new Error('The provided User ID is not a number.')
  }

  return getAwardedTimestamps(args.userId, args.badgeId)
};

var getBadgeInfo = {};

// Includes
const http$1y = http$1_.func;

// Args
getBadgeInfo.required = ['badgeId'];

// Docs
/**
 * ✅ Get the info of a badge.
 * @category Badges
 * @alias getBadgeInfo
 * @param {number} badgeId - The badge's id.
 * @returns {Promise<BadgeInfo>}
 * @example const noblox = require("noblox.js")
 * const badgeInfo = await noblox.getBadgeInfo(1)
**/

// Define
const badgeInfo = async (id) => {
  return http$1y({
    url: `https://badges.roblox.com/v1/badges/${id}`,
    options: {
      resolveWithFullResponse: true,
      method: 'GET'
    }
  }).then(res => {
    if (res.statusCode === 200) {
      const json = JSON.parse(res.body);
      json.created = new Date(json.created);
      json.updated = new Date(json.updated);
      return json
    } else {
      throw new Error('Badge is invalid or does not exist.')
    }
  })
};

getBadgeInfo.func = async (args) => {
  if (isNaN(args.badgeId)) {
    throw new Error('The provided Badge ID is not a number.')
  }
  return badgeInfo(args.badgeId)
};

var getGameBadges = {};

// Includes
const http$1x = http$1_.func;

// Args
getGameBadges.required = ['universeId'];
getGameBadges.optional = ['limit', 'cursor', 'sortOrder'];

// Docs
/**
 * ✅ Get the badges in a specific game.
 * @category Game
 * @alias getGameBadges
 * @param {number} universeId - The id of the universe.
 * @param {Limit=} limit - The max number of badges to return.
 * @param {string=} cursor - The page cursor.
 * @param {SortOrder=} sortOrder - The order to sort badges in. (Asc/Desc)
 * @returns {Promise<BadgeInfo>}
 * @example const noblox = require("noblox.js")
 * const badges = await noblox.getGameBadges(1)
**/

// Define
const gameBadges = async (id, limit, cursor, order) => {
  return http$1x({
    url: `https://badges.roblox.com/v1/universes/${id}/badges?limit=${limit}&cursor=${cursor}&sortOrder=${order}`,
    options: {
      resolveWithFullResponse: true,
      method: 'GET'
    }
  }).then(res => {
    if (res.statusCode === 200) {
      const json = JSON.parse(res.body);
      json.data.map(badge => {
        badge.created = new Date(badge.created);
        badge.updated = new Date(badge.updated);
        return badge
      });
      return json.data
    } else {
      throw new Error('The game is invalid or does not exist.')
    }
  })
};
getGameBadges.func = async (args) => {
  if (isNaN(args.universeId)) {
    throw new Error('The provided Universe ID is not a number.')
  }  if (args.limit) {
    if (![10, 25, 50, 100].includes(args.limit)) {
      throw new Error('The allowed values are: 10, 25, 50 and 100.')
    }  }  if (args.sortOrder) {
    if (args.sortOrder.toLowerCase() !== 'asc' && args.sortOrder.toLowerCase() !== 'desc') {
      throw new Error('Invalid sort order type.')
    }
  }
  const limit = args.limit || 10;
  const sortOrder = args.sortOrder || 'Asc';
  const cursor = args.cursor || '';
  return gameBadges(args.universeId, limit, cursor, sortOrder)
};

var getPlayerBadges = {};

var getPageResults$f = {};

// Includes
const http$1w = http$1_.func;

// Args
getPageResults$f.required = ['url', 'query', 'limit'];
getPageResults$f.optional = ['jar', 'sortOrder'];

// Docs
/**
 * ✅ Handle pagination returned by Roblox.
 * @category Utility
 * @alias getPageResults
 * @param {string} url - The url to retrieve the page results from.
 * @param {string} query - Any query parameters to add to the url.
 * @param {SortOrder=} sortOrder - The order to sort the results by.
 * @param {Limit=} limit - The maximum number of results to return. Following 'pages' of results will be requested until
 * this limit of results is reached.
 * @param {string=} pageCursor - Current page index
 * @returns {Promise<Array>}
 * @example const noblox = require("noblox.js")
 * const inventory = await noblox.getPageResults("//inventory.roblox.com/v2/users/1/inventory", "Shirt", "Asc", 100)
**/

// Define
function getPageResults$e (jar, url, query, sortOrder, limit, pageCursor, results) {
  return new Promise((resolve, reject) => {
    const allowedLimits = [10, 25, 50, 100];

    const httpOpt = {
      url,
      options: {
        qs: {
          limit: limit <= 100 ? allowedLimits.reduce((prev, curr) => Math.abs(curr - limit) < Math.abs(prev - limit) ? curr : prev) : 100, // Get the most fit page limit within the boundries.
          cursor: pageCursor || '', // Add page cursor.
          ...query // Add asset types.
        },
        method: 'GET',
        resolveWithFullResponse: true,
        jar,
        json: true
      }
    };
    return http$1w(httpOpt).then((res) => {
      let body = res.body;
      if (typeof (body) === 'string') body = JSON.parse(body.trim());

      const data = body.data;

      if (body.errors && body.errors.length > 0) {
        const errors = body.errors.map((e) => {
          return e.message
        });

        return reject(new Error(`${res.statusCode} ${errors.join(', ')}`))
      }

      results = results ? results.concat(data) : data;

      if (results.length > limit) {
        results = results.slice(0, limit);
      }

      if (results.length >= limit || data.length === 0 || !body.nextPageCursor) {
        return resolve(results)
      }

      resolve(getPageResults$e(jar, url, query, sortOrder, limit, body.nextPageCursor, results));
    })
      .catch(error => reject(error))
  })
}

function parseDates (results) {
  return new Promise((resolve, reject) => {
    if (!results) return resolve([])

    resolve(results.map(result => {
      if (result.created) result.created = new Date(result.created);
      if (result.updated) result.updated = new Date(result.updated);
      return result
    }));
  })
}

getPageResults$f.func = function (args) {
  return getPageResults$e(args.jar, args.url, args.query, args.sortOrder, args.limit).then(results => {
    return parseDates(results)
  })
};

// Includes
const getPageResults$d = getPageResults$f.func;

// Args
getPlayerBadges.required = ['userId'];
getPlayerBadges.optional = ['limit', 'sortOrder', 'jar'];

// Docs
/**
 * ✅ Get the badges that a user has.
 * @category User
 * @alias getPlayerBadges
 * @param {number} userId - The id of the user whose badges are being fetched.
 * @param {number} [limit=10] - The amount of badges being returned each request.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data will be returned in (Asc or Desc)
 * @returns {Promise<Array<PlayerBadges>>}
 * @example const noblox = require("noblox.js")
 * let badges = noblox.getPlayerBadges(123456, 10, "Asc")
**/

getPlayerBadges.func = async (args) => {
  return getPageResults$d({
    jar: args.jar,
    url: `//badges.roblox.com/v1/users/${args.userId}/badges`,
    sortOrder: args.sortOrder,
    limit: args.limit
  })
};

var updateBadgeInfo = {};

// Includes
const http$1v = http$1_.func;
const getGeneralToken$A = getGeneralToken$P.func;

// Args
updateBadgeInfo.required = ['badgeId'];
updateBadgeInfo.optional = ['name', 'description', 'enabled', 'jar'];

// Docs
/**
 * 🔐 Configure a badge.
 * @category Badges
 * @alias updateBadgeInfo
 * @param {number} badgeId - The badge's id.
 * @param {string=} name - The new name of the badge.
 * @param {string=} description - The new description of the badge.
 * @param {boolean=} enabled - If the badge is enabled.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.updateBadgeInfo(1, "Badge", "A cool badge.", true)
**/

// Define
const updateInfo = (id, name, desc, enabled, xcrsf, jar) => {
  return http$1v({
    url: `https://badges.roblox.com/v1/badges/${id}`,
    options: {
      resolveWithFullResponse: true,
      method: 'PATCH',
      jar,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': xcrsf
      },
      body: JSON.stringify({
        name,
        description: desc,
        enabled
      })
    }
  }).then(res => {
    if (res.statusCode === 200) {
      return JSON.parse(res.body)
    } else if (res.statusCode === 400) {
      throw new Error('Text moderated.')
    } else if (res.statusCode === 401) {
      throw new Error('Authorization has been denied for this request.')
    } else if (res.statusCode === 403) {
      throw new Error('Token Validation failed or you do not have permission to manage this badge.')
    } else if (res.statusCode === 404) {
      throw new Error('Badge is invalid or does not exist.')
    }
  })
};

updateBadgeInfo.func = async (args) => {
  if (isNaN(args.badgeId)) {
    throw new Error('The provided Badge ID is not a number.')
  }
  if (args.name) {
    if (typeof args.name !== 'string') throw new Error('The name must be a string.')
  } else if (args.description) {
    if (typeof args.description !== 'string') throw new Error('The description must be a string.')
  }

  if (args.enabled) {
    if (typeof args.enabled !== 'boolean') {
      throw new Error('Enabled must be a boolean.')
    }
  }

  const name = args.name || '';
  const description = args.description || '';
  const enabled = args.enabled || true;
  const jar = args.jar;

  const xcsrf = await getGeneralToken$A({ jar });
  return updateInfo(args.badgeId, name, description, enabled, xcsrf, jar)
};

var addUsersToConversation$1 = {};

const http$1u = http$1_.func;
const getGeneralToken$z = getGeneralToken$P.func;

addUsersToConversation$1.required = ['conversationId', 'userIds'];
addUsersToConversation$1.optional = ['jar'];

// Docs
/**
 * 🔐 Add users to a conversation.
 * @category Chat
 * @alias addUsersToConversation
 * @param {number} conversationId - The id of the conversation.
 * @param {Array<number>} userIds - The userIds of the users to add.
 * @returns {Promise<ConversationAddResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.addUsersToConversation(1, [1, 2, 3])
**/

function addUsersToConversation (conversationId, userIds, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/add-to-conversation',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          conversationId,
          participantUserIds: userIds
        },
        resolveWithFullResponse: true
      }
    };
    return http$1u(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        let error = 'An unknown error has occurred.';
        if (res.body && res.body.errors) {
          error = res.body.errors.map((e) => e.message).join('\n');
        }
        reject(new Error(error));
      }
    }).catch(error => reject(error))
  })
}

addUsersToConversation$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$z({ jar }).then((xcsrf) => {
    return addUsersToConversation(args.conversationId, args.userIds, jar, xcsrf)
  })
};

var chatSettings = {};

const http$1t = http$1_.func;

chatSettings.optional = ['jar'];

// Docs
/**
 * 🔐 Get the chat settings.
 * @category Chat
 * @alias chatSettings
 * @returns {Promise<ChatSettings>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const settings = await noblox.chatSettings()
**/

chatSettings.func = (args) => {
  const jar = args.jar;

  return http$1t({
    url: '//chat.roblox.com/v2/chat-settings',
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var getChatMessages = {};

const http$1s = http$1_.func;

getChatMessages.required = ['conversationId'];
getChatMessages.optional = ['pageSize', 'exclusiveStartMessageId', 'jar'];

// Docs
/**
 * 🔐 Get the chat messages for a conversation.
 * @category Chat
 * @alias getChatMessages
 * @param {number} conversationId - The id of the conversation.
 * @param {number=} [pageSize=100] - The size of the page.
 * @param {string=} exclusiveStartMessageId - The messageId to start at.
 * @returns {Promise<ChatMessage[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const messages = await noblox.getChatMessages(1, 25)
**/

getChatMessages.func = (args) => {
  const jar = args.jar;
  const conversationId = parseInt(args.conversationId) ? parseInt(args.conversationId) : 0;
  const pageSize = parseInt(args.pageSize) ? parseInt(args.pageSize) : 100;
  const startMessageId = typeof (args.exclusiveStartMessageId) === 'string' ? args.exclusiveStartMessageId : '';

  return http$1s({
    url: '//chat.roblox.com/v2/get-messages?conversationId=' + conversationId + '&pageSize=' + pageSize + '&exclusiveStartMessageId=' + startMessageId,
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var getConversations = {};

const http$1r = http$1_.func;

getConversations.required = ['conversationIds'];
getConversations.optional = ['jar'];

// Docs
/**
 * 🔐 Get conversation details for the conversationIds specified in the parameters
 * @category Chat
 * @alias getConversations
 * @param {Array<number>} conversationIds - An array with the ids of the conversations.
 * @returns {Promise<ChatConversation[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const conversations = await noblox.getConversations([1, 2, 3])
 **/

getConversations.func = (args) => {
  const jar = args.jar;
  const conversationIds = typeof (args.conversationIds) === 'object' ? args.conversationIds : [];

  return http$1r({
    url: '//chat.roblox.com/v2/get-conversations?conversationIds=' + conversationIds.join('&conversationIds='),
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      const body = JSON.parse(res.body) || {};
      if (body.errors && body.errors.length > 0) {
        const errors = body.errors.map((e) => {
          return e.message
        });
        throw new Error(`${res.statusCode} ${errors.join(', ')}`)
      }
    } else {
      let response = JSON.parse(res.body);

      response = response.map((entry) => {
        entry.lastUpdated = new Date(entry.lastUpdated);
        return entry
      });

      return response
    }
  })
};

var getRolloutSettings = {};

const http$1q = http$1_.func;

getRolloutSettings.optional = ['featureNames', 'jar'];

// Docs
/**
 * 🔐 Get the rollout settings.
 * @category Chat
 * @alias getRolloutSettings
 * @param {Array<string>=} featureNames - The names of the features rolling out.
 * @returns {Promise<GetRolloutSettingsResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const settings = await noblox.getRolloutSettings(['LuaChat', 'Party'])
**/

getRolloutSettings.func = (args) => {
  const jar = args.jar;
  const featureNames = typeof (args.featureNames) === 'object' ? args.featureNames : [];

  return http$1q({
    url: '//chat.roblox.com/v2/get-rollout-settings?featureNames=' + featureNames.join('&featureNames='),
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var getUnreadConversationCount = {};

const http$1p = http$1_.func;

getUnreadConversationCount.optional = ['jar'];

// Docs
/**
 * 🔐 Get the number of unread conversations.
 * @category Chat
 * @alias getUnreadConversationCount
 * @returns {Promise<GetUnreadConversationCountResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const unreadConversationCount = noblox.getUnreadConversationCount()
**/

getUnreadConversationCount.func = (args) => {
  const jar = args.jar;

  return http$1p({
    url: '//chat.roblox.com/v2/get-unread-conversation-count',
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var getUnreadMessages = {};

const http$1o = http$1_.func;

getUnreadMessages.required = ['conversationIds'];
getUnreadMessages.optional = ['pageSize', 'jar'];

// Docs
/**
 * 🔐 Returns unread messages in the given conversations
 * @category Chat
 * @alias getUnreadMessages
 * @param {Array<number>} conversationIds - The IDs of the conversations you want unread messages from.
 * @param {number} pageSize - Number of messages to return on each page.
 * @returns {Promise<ChatConversationWithMessages[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.getUnreadMessages([8212952828])
**/

getUnreadMessages.func = (args) => {
  const jar = args.jar;
  const conversationIds = typeof (args.conversationIds) === 'object' ? args.conversationIds : [];
  const pageSize = parseInt(args.pageSize) ? parseInt(args.pageSize) : 30;

  return http$1o({
    url: '//chat.roblox.com/v2/get-unread-messages?pageSize=' + pageSize + '&conversationIds=' + conversationIds.join('&conversationIds='),
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var getUserConversations = {};

const http$1n = http$1_.func;

getUserConversations.optional = ['pageNumber', 'pageSize', 'jar'];

// Docs
/**
 * 🔐 Get your conversations.
 * @category Chat
 * @alias getUserConversations
 * @param {number=} pageNumber - The page index.
 * @param {number=} pageSize - The size of each page.
 * @returns {Promise<ChatConversation[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const conversations = await noblox.getUserConversations()
**/

getUserConversations.func = (args) => {
  const jar = args.jar;
  const pageNumber = parseInt(args.pageNumber) ? parseInt(args.pageNumber) : 1;
  const pageSize = parseInt(args.pageSize) ? parseInt(args.pageSize) : 30;

  return http$1n({
    url: '//chat.roblox.com/v2/get-user-conversations?pageNumber=' + pageNumber + '&pageSize=' + pageSize,
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var markChatAsRead = {};

const http$1m = http$1_.func;
const getGeneralToken$y = getGeneralToken$P.func;

markChatAsRead.required = ['conversationId', 'endMessageId'];
markChatAsRead.optional = ['jar'];

// Docs
/**
 * 🔐 Mark a chat as read.
 * @category Chat
 * @alias markChatAsRead
 * @param {number} conversationId - The id of the conversation.
 * @param {string} endMessageId - The last message to read.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.markChatAsRead(8212952828, 'e775e103-876f-4332-84ab-1ea14f326d39')
**/

const nextFunction$4 = (jar, token, conversationId, endMessageId) => {
  return http$1m({
    url: '//chat.roblox.com/v2/mark-as-read',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        conversationId,
        endMessageId
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.resultType === 'Success') {
        throw new Error(res.body.statusMessage)
      }
    } else {
      throw new Error('Mark as read failed')
    }
  })
};

markChatAsRead.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$y({ jar }).then((xcsrf) => {
    return nextFunction$4(jar, xcsrf, args.conversationId, args.endMessageId)
  })
};

var markChatAsSeen = {};

const http$1l = http$1_.func;
const getGeneralToken$x = getGeneralToken$P.func;

markChatAsSeen.required = ['conversationIds'];
markChatAsSeen.optional = ['jar'];

// Docs
/**
 * 🔐 Mark chats as seen.
 * @category Chat
 * @alias markChatAsSeen
 * @param {Array<number>} conversationIds - An array with conversationIds.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.markChatAsSeen([1, 2, 3])
**/

const nextFunction$3 = (jar, token, conversationIds) => {
  return http$1l({
    url: '//chat.roblox.com/v2/mark-as-seen',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        conversationsToMarkSeen: conversationIds
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.resultType === 'Success') {
        throw new Error(res.body.statusMessage)
      }
    } else {
      throw new Error('Mark as seen failed')
    }
  })
};

markChatAsSeen.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$x({ jar }).then((xcsrf) => {
    return nextFunction$3(jar, xcsrf, args.conversationIds)
  })
};

var multiGetLatestMessages = {};

const http$1k = http$1_.func;

multiGetLatestMessages.required = ['conversationIds'];
multiGetLatestMessages.optional = ['pageSize', 'jar'];

// Docs
/**
 * 🔐 Get multiple of the latest messages.
 * @category Chat
 * @alias multiGetLatestMessages
 * @param {Array<number>} conversationIds - An array with the conversationIds.
 * @returns {Promise<ChatConversationWithMessages[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const recentMessages = await noblox.multiGetLatestMessages([1, 2, 3])
**/

multiGetLatestMessages.func = (args) => {
  const jar = args.jar;
  const conversationIds = typeof (args.conversationIds) === 'object' ? args.conversationIds : [];
  const pageSize = parseInt(args.pageSize) ? parseInt(args.pageSize) : 30;

  return http$1k({
    url: '//chat.roblox.com/v2/multi-get-latest-messages?pageSize=' + pageSize + '&conversationIds=' + conversationIds.join('&conversationIds='),
    options: {
      method: 'GET',
      jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in')
    } else {
      return JSON.parse(res.body)
    }
  })
};

var onNewConversation = {};

const require$$0$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(events$h);

var onNotification$f = {};

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(signalr);

// Dependencies
const signalR = require$$0$1;
const events$g = require$$0$2;

// Includes
const getSession = getSession$2.func;
const settings$8 = require$$196;

// Args
onNotification$f.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when you get a notification.
 * @category Client
 * @alias onNotification
 * @returns An EventEmitter that emits when you get a notification.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const notification = noblox.onNotification()
 * notification.on("data", function(data) {
 *  console.log("New notification! ", data)
 * })
 * notification.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onNotification$f.func = function (args) {
  const max = settings$8.event.maxRetries;
  const notifications = new events$g.EventEmitter();
  function connect (retries) {
    if (typeof args.jar === 'string') {
      args.jar = { session: args.jar };
    }
    const session = getSession({ jar: args.jar });
    let userNotificationConnection = null;

    userNotificationConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://realtime-signalr.roblox.com/userhub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
        headers: {
          Cookie: '.ROBLOSECURITY=' + session + ';'
        }
      })
      .build();

    userNotificationConnection.on('notification', function (name, message) {
      notifications.emit('data', name, JSON.parse(message));
    });

    notifications.on('close', userNotificationConnection.stop);

    userNotificationConnection.disconnected = function (err) {
      notifications.emit('error', new Error('Connection failed: ' + err.message));
      if (retries !== -1) {
        if (retries > max) {
          notifications.emit('close', new Error('Max retries reached'));
        } else {
          setTimeout(connect, 5000, retries + 1);
        }
      }
    };

    userNotificationConnection.error = function (err) {
      notifications.emit('error', err);
    };

    userNotificationConnection.connected = function (connection) {
      notifications.emit('connect', connection);
    };

    userNotificationConnection.reconnecting = function () {
      setTimeout(connect, 5000, 0);
      notifications.emit('error', new Error('Lost connection, reconnecting'));
      return true // Abort reconnection
    };

    userNotificationConnection.start();
  }
  connect(-1);
  return notifications
};

const events$f = require$$0$2;

const onNotification$e = onNotification$f.func;

onNewConversation.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a conversation is created.
 * @category Chat
 * @alias onNewConversation
 * @returns An EventEmitter that emits when a conversation is created.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const conversationEvent = noblox.onNewConversation()
 * conversationEvent.on("data", function(data) {
 *  console.log("New conversation! ", data)
 * })
 * conversationEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onNewConversation.func = (args) => {
  const jar = args.jar;
  const onChatEvent = new events$f.EventEmitter();
  const notifications = onNotification$e({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'ChatNotifications' && message.Type === 'NewConversation') {
      onChatEvent.emit('data', message.ConversationId);
    }
  });

  notifications.on('error', (err) => {
    onChatEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    onChatEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return onChatEvent
};

var onNewMessage = {};

const events$e = require$$0$2;

const onNotification$d = onNotification$f.func;

onNewMessage.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone messages you via. chat. This event will only emit for messages sent via. chat windows on
 * the website - those in the pop-up/overlay window. To handle messages sent via. the older email-like
 * message function, see onMessage.
 * @see [onMessage()](global.html#onMessage)
 * @category Chat
 * @alias onNewMessage
 * @returns An EventEmitter that emits when someone messages you.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const messageEvent = noblox.onNewMessage()
 * messageEvent.on("data", function(data) {
 *  console.log("New chat message! ", data)
 * })
 * messageEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onNewMessage.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$e.EventEmitter();
  const notifications = onNotification$d({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'ChatNotifications' && message.Type === 'NewMessage') {
      newEvent.emit('data', message.ConversationId);
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onNewMessageBySelf = {};

const events$d = require$$0$2;

const onNotification$c = onNotification$f.func;

onNewMessageBySelf.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when you send a new message.
 * @category Chat
 * @alias onNewMessageBySelf
 * @returns An EventEmitter that emits when you send a new message.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const messageSent = noblox.onNewMessageBySelf()
 * messageSent.on("data", function(data) {
 *  console.log("Sent chat message! ", data)
 * })
 * messageSent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onNewMessageBySelf.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$d.EventEmitter();
  const notifications = onNotification$c({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'ChatNotifications' && message.Type === 'NewMessageBySelf') {
      newEvent.emit('data', message.ConversationId);
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onUserOnline = {};

const events$c = require$$0$2;

const onNotification$b = onNotification$f.func;

onUserOnline.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone comes online.
 * @category Chat
 * @alias onUserOnline
 * @returns An EventEmitter that emits when someone comes online.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const userOnlineEvent = noblox.onUserOnline()
 * userOnlineEvent.on("data", function(data) {
 *  console.log("User online! ", data)
 * })
 * userOnlineEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onUserOnline.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$c.EventEmitter();
  const notifications = onNotification$b({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PresenceNotifications' && message.Type === 'UserOnline') {
      newEvent.emit('data', message.UserId);
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onUserTyping = {};

const events$b = require$$0$2;

const onNotification$a = onNotification$f.func;

onUserTyping.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone starts typing in a chat.
 * @category Chat
 * @alias onUserTyping
 * @returns An EventEmitter that emits when someone starts typing in a chat.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const userTyping = noblox.onUserTyping()
 * userTyping.on("data", function(data) {
 *  console.log("User typing! ", data)
 * })
 * userTyping.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onUserTyping.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$b.EventEmitter();
  const notifications = onNotification$a({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'ChatNotifications' && message.Type === 'ParticipantTyping') {
      newEvent.emit('data', {
        UserId: message.UserId,
        ConversationId: message.ConversationId,
        IsTyping: message.IsTyping
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var removeFromGroupConversation$1 = {};

const http$1j = http$1_.func;
const getGeneralToken$w = getGeneralToken$P.func;

removeFromGroupConversation$1.required = ['conversationId', 'userId'];
removeFromGroupConversation$1.optional = ['jar'];

// Docs
/**
 * 🔐 Remove a user from the group conversation.
 * @category Chat
 * @alias removeFromGroupConversation
 * @param {number} conversationId - The id of the conversation.
 * @param {number} userId - The id of the user.
 * @returns {Promise<ConversationRemoveResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.removeFromGroupConversation(1, 2)
**/

function removeFromGroupConversation (conversationId, userId, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/remove-from-conversation',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          conversationId,
          participantUserId: userId
        },
        resolveWithFullResponse: true
      }
    };

    return http$1j(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        let error = 'An unknown error has occurred.';
        if (res.body && res.body.errors) {
          error = res.body.errors.map((e) => e.message).join('\n');
        }
        reject(new Error(error));
      }
    }).catch(error => reject(error))
  })
}

removeFromGroupConversation$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$w({ jar }).then((xcsrf) => {
    return removeFromGroupConversation(args.conversationId, args.userId, jar, xcsrf)
  })
};

var renameGroupConversation$1 = {};

const http$1i = http$1_.func;
const getGeneralToken$v = getGeneralToken$P.func;

renameGroupConversation$1.required = ['conversationId', 'title'];
renameGroupConversation$1.optional = ['jar'];

// Docs
/**
 * 🔐 Rename a group conversation.
 * @category Chat
 * @alias renameGroupConversation
 * @param {number} conversationId - The id of the conversation.
 * @param {string} title - The new title of the group.
 * @returns {Promise<ConversationRenameResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.renameGroupConversation(1, "A cool group.")
**/

function renameGroupConversation (conversationId, newTitle, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/rename-group-conversation',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          conversationId,
          newTitle
        },
        resolveWithFullResponse: true
      }
    };
    return http$1i(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        reject(new Error('Rename group chat failed'));
      }
    }).catch(error => reject(error))
  })
}

renameGroupConversation$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$v({ jar }).then((xcsrf) => {
    return renameGroupConversation(args.conversationId, args.title, jar, xcsrf)
  })
};

var sendChatMessage$1 = {};

const http$1h = http$1_.func;
const getGeneralToken$u = getGeneralToken$P.func;

sendChatMessage$1.required = ['conversationId', 'message'];
sendChatMessage$1.optional = ['jar'];

// Docs
/**
 * 🔐 Send a message in a chat.
 * @category Chat
 * @alias sendChatMessage
 * @param {number} conversationId - The id of the conversation.
 * @param {string} message - The message to send.
 * @returns {Promise<SendChatResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.sendChatMessage(1, "Hello world!")
**/

function sendChatMessage (conversationId, messageText, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/send-message',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          conversationId,
          message: messageText
        },
        resolveWithFullResponse: true
      }
    };
    return http$1h(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        throw new Error('Send chat message failed')
      }
    }).catch(error => reject(error))
  })
}

sendChatMessage$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$u({ jar }).then((xcsrf) => {
    return sendChatMessage(args.conversationId, args.message, jar, xcsrf)
  })
};

var setChatUserTyping$1 = {};

const http$1g = http$1_.func;
const getGeneralToken$t = getGeneralToken$P.func;

setChatUserTyping$1.required = ['conversationId', 'isTyping'];
setChatUserTyping$1.optional = ['jar'];

// Docs
/**
 * 🔐 Trigger the typing action in a conversation.
 * @category Chat
 * @alias setChatUserTyping
 * @param {number} conversationId - The id of the conversation.
 * @param {boolean} isTyping - If the user is typing.
 * @returns {Promise<UpdateTypingResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setChatUserTyping(1, true)
**/

function setChatUserTyping (conversationId, isTyping, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/update-user-typing-status',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          conversationId,
          isTyping
        },
        resolveWithFullResponse: true
      }
    };
    return http$1g(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        let error = 'An unknown error has occurred.';
        if (res.body && res.body.errors) {
          error = res.body.errors.map((e) => e.message).join('\n');
        }
        reject(new Error(error));
      }
    }).catch(error => reject(error))
  })
}

setChatUserTyping$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$t({ jar }).then((xcsrf) => {
    return setChatUserTyping(args.conversationId, args.isTyping, jar, xcsrf)
  })
};

var start121Conversation = {};

const http$1f = http$1_.func;
const getGeneralToken$s = getGeneralToken$P.func;

start121Conversation.required = ['userId'];
start121Conversation.optional = ['jar'];

// Docs
/**
 * 🔐 Start a conversation with another user.
 * @category Chat
 * @alias start121Conversation
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.start121Conversation(1)
**/

const nextFunction$2 = (jar, token, userId) => {
  return http$1f({
    url: '//chat.roblox.com/v2/start-one-to-one-conversation',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        participantUserId: userId
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.resultType === 'Success') {
        throw new Error(res.body.statusMessage)
      }
    } else {
      throw new Error('Start conversation failed')
    }
  })
};

start121Conversation.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$s({ jar }).then((xcsrf) => {
    return nextFunction$2(jar, xcsrf, args.userId)
  })
};

var startCloudEditConversation = {};

const http$1e = http$1_.func;
const getGeneralToken$r = getGeneralToken$P.func;

startCloudEditConversation.required = ['placeId'];
startCloudEditConversation.optional = ['jar'];

// Docs
/**
 * 🔐 Start a Cloud Edit/Team Create conversation.
 * @category Chat
 * @alias startCloudEditConversation
 * @param {number} placeId - The id of the place.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.startCloudEditConversation(1117747196)
**/

const nextFunction$1 = (jar, token, placeId) => {
  return http$1e({
    url: '//chat.roblox.com/v2/start-cloud-edit-conversation',
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        placeId
      },
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.statusCode === 200) {
      if (!res.body.resultType === 'Success') {
        throw new Error(res.body.statusMessage)
      }
    } else {
      throw new Error('Start cloud edit chat failed')
    }
  })
};

startCloudEditConversation.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$r({ jar }).then((xcsrf) => {
    return nextFunction$1(jar, xcsrf, args.placeId)
  })
};

var startGroupConversation$1 = {};

const http$1d = http$1_.func;
const getGeneralToken$q = getGeneralToken$P.func;

startGroupConversation$1.required = ['userIds', 'title'];
startGroupConversation$1.optional = ['jar'];

// Docs
/**
 * 🔐 Start a group conversation.
 * @category Chat
 * @alias startGroupConversation
 * @param {Array<number>} userIds - An array of userIds to add.
 * @param {string} title - The title of the group.
 * @returns {Promise<StartGroupConversationResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.startGroupConversation([1, 2, 3], "A group conversation.")
**/

function startGroupConversation (userIds, chatTitle, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/start-group-conversation',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          participantUserIds: userIds,
          title: chatTitle
        },
        resolveWithFullResponse: true
      }
    };

    return http$1d(httpOpt).then((res) => {
      if (res.statusCode === 200) {
        if (!res.body.resultType === 'Success') {
          reject(new Error(res.body.statusMessage));
        } else {
          resolve(res.body);
        }
      } else {
        let error = 'An unknown error has occurred.';
        if (res.body && res.body.errors) {
          error = res.body.errors.map((e) => e.message).join('\n');
        }
        reject(new Error(error));
      }
    }).catch(error => reject(error))
  })
}

startGroupConversation$1.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$q({ jar }).then((xcsrf) => {
    return startGroupConversation(args.userIds, args.title, jar, xcsrf)
  })
};

var setAPIKey = {};

const options$2 = options$6;

setAPIKey.required = ['apiKey'];

// Docs
/**
 * 🔑 Sign in with an API key.
 * @category Client
 * @alias setAPIKey
 * @param {string} apiKey - The api key to sign in with.
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * noblox.setAPIKey("A3H+1rfQj0Kwz0CsSO2ciuT/e/ZHekahvehGG3PPmFOASZx1")
**/

setAPIKey.func = function (args) {
  options$2.jar.apiKey = args.apiKey;
};

var setCookie = {};

var getAuthenticatedUser$1 = {};

// Includes
const http$1c = http$1_.func;

// Args
getAuthenticatedUser$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get the current authenticated user.
 * @category Utility
 * @alias getAuthenticatedUser
 * @returns {AuthenticatedUserData}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * const user = await noblox.getAuthenticatedUser()
**/

// Define
getAuthenticatedUser$1.func = async function (args) {
  const jar = args.jar;
  const httpOpt = {
    url: '//users.roblox.com/v1/users/authenticated',
    options: {
      method: 'GET',
      followRedirect: false,
      jar,
      json: true,
      resolveWithFullResponse: true
    }
  };

  const res = await http$1c(httpOpt);

  if (res.statusCode === 401) {
    throw new Error('You are not logged in.')
  } else if (res.statusCode !== 200) {
    throw new Error(JSON.stringify(res.body))
  }

  return res.body
};

const options$1 = options$6;
const getAuthenticatedUser = getAuthenticatedUser$1.func;

setCookie.required = ['cookie'];
setCookie.optional = ['validate'];

// Docs
/**
 * 🔑 Sign in with a cookie.
 * @category Client
 * @alias setCookie
 * @param {string} cookie - The cookie to sign in with.
 * @param {boolean=} [validate=true] - Whether to validate the cookie or not.
 * @returns {Promise<AuthenticatedUserData>}
 * @example const noblox = require("noblox.js")
 * noblox.setCookie("cookie").then(function() {
 *   //your code here
 * })
**/

setCookie.func = async function (args) {
  // verify it
  if (!args.cookie.toLowerCase().includes('warning:-')) {
    console.error('Warning: No Roblox warning detected in provided cookie. Ensure you include the entire .ROBLOSECURITY warning.');
  }
  if (args.validate === false) {
    options$1.jar.session = args.cookie;
    return false
  }
  try {
    const res = await getAuthenticatedUser({ jar: { session: args.cookie } });
    options$1.jar.session = args.cookie;
    return res
  } catch (error) {
    console.error('Failed to validate cookie: Are you sure the cookie is valid?\nEnsure you include the full cookie, including warning text.');
    throw new Error(error)
  }
};

var deleteDatastoreEntry$1 = {};

// Includes
const http$1b = http$1_.func;

// Args
deleteDatastoreEntry$1.required = ['universeId', 'datastoreName', 'entryKey'];
deleteDatastoreEntry$1.optional = ['scope', 'jar'];

// Docs
/**
 * <p> ☁️ Marks the entry as deleted by creating a tombstone version. Entries are deleted permanently after 30 days. </p>
 * API Key Permissions:
 * <ul>
 *  <li> Delete entry </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {string} entryKey - The key which identifies the entry.
 * @param {string=} [scope=global] - Defaults to global, similar to Lua API.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * await noblox.deleteDatastoreEntry({ universeId: 127407415, datastoreName: 'LevelStore', entryKey: 'Level_User' })
**/

// Define
function deleteDatastoreEntry (universeId, datastoreName, entryKey, scope = 'global', jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
      options: {
        resolveWithFullResponse: true,
        method: 'DELETE',
        jar,
        qs: {
          datastoreName,
          scope,
          entryKey
        }
      }
    };
    return http$1b(httpOpt)
      .then(function (res) {
        if (res.statusCode === 204) {
          resolve();
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

deleteDatastoreEntry$1.func = function (args) {
  return deleteDatastoreEntry(args.universeId, args.datastoreName, args.entryKey, args.scope, args.jar)
};

var getDatastoreEntry$1 = {};

// Includes
const http$1a = http$1_.func;

// Args
getDatastoreEntry$1.required = ['universeId', 'datastoreName', 'entryKey'];
getDatastoreEntry$1.optional = ['scope', 'versionId', 'jar'];

// Docs
/**
 * <p> ☁️ Returns the latest value and metadata associated with an entry, or a specific version if versionId is provided. </p>
 * API Key Permissions:
 * <ul>
 *  <li> Read entries </li>
 *  <li> Read version </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {string} entryKey - The key which identifies the entry.
 * @param {string=} [scope=global] - Defaults to global, similar to Lua API.
 * @param {string=} versionId - The version to inspect
 * @returns {Promise<DatastoreEntry>}
 * @example const noblox = require("noblox.js")
 * const entry = await noblox.getDatastoreEntry({ universeId: 127407415, datastoreName: 'LevelStore', entryKey: 'Level_User' })
**/

// Define
function getDatastoreEntry (universeId, datastoreName, entryKey, scope = 'global', versionId, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: versionId ? `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions/version` : `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET',
        jar,
        qs: {
          datastoreName,
          scope,
          entryKey,
          versionId
        }
      }
    };
    return http$1a(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          const headers = res.headers;

          resolve({
            data: response,
            metadata: {
              robloxEntryCreatedTime: new Date(headers['roblox-entry-created-time']),
              lastModified: headers['last-modified'] ? new Date(headers['last-modified']) : new Date(headers['roblox-entry-created-time']),
              robloxEntryVersion: headers['roblox-entry-version'],
              robloxEntryAttributes: headers['roblox-entry-attributes'],
              robloxEntryUserIDs: headers['roblox-entry-userids'],
              contentMD5: headers['content-md5'],
              contentLength: parseInt(headers['content-length'])
            }
          });
        } else if (res.statusCode === 204) {
          const headers = res.headers;

          resolve({
            data: null,
            metadata: {
              robloxEntryCreatedTime: new Date(headers['roblox-entry-created-time']),
              lastModified: headers['last-modified'] ? new Date(headers['last-modified']) : new Date(headers['roblox-entry-created-time']),
              robloxEntryVersion: headers['roblox-entry-version'],
              robloxEntryAttributes: headers['roblox-entry-attributes'],
              robloxEntryUserIDs: headers['roblox-entry-userids'],
              contentMD5: headers['content-md5'],
              contentLength: headers['content-length']
            }
          });
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

getDatastoreEntry$1.func = function (args) {
  return getDatastoreEntry(args.universeId, args.datastoreName, args.entryKey, args.scope, args.versionId, args.jar)
};

var getDatastoreEntryVersions$1 = {};

// Includes
const http$19 = http$1_.func;

// Args
getDatastoreEntryVersions$1.required = ['universeId', 'datastoreName', 'entryKey'];
getDatastoreEntryVersions$1.optional = ['scope', 'startTime', 'endTime', 'sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * <p> ☁️ Returns a list of entry versions of an entry. </p>
 * API Key Permissions:
 * <ul>
 *  <li> List versions </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {string} entryKey - The key which identifies the entry.
 * @param {(string | boolean)=} [scope=global] - Defaults to global, similar to Lua API.
 * @param {Date=} startTime - Don't consider versions older than this
 * @param {Date=} endTime - Don't consider versions younger than this
 * @param {("Ascending" | "Descending")=} [sortOrder=Ascending] - Older first (Ascending) or younger first (Descending)
 * @param {number=} limit - Maximum number of items to return
 * @param {string=} cursor - Provide to request the next set of data
 * @returns {Promise<EntryVersionsResult>}
 * @example const noblox = require("noblox.js")
 * const versions = await noblox.getDatastoreEntryVersions({ universeId: 127407415, datastoreName: 'LevelStore', entryKey: 'Level_User' })
**/

// Define
function getDatastoreEntryVersions (universeId, datastoreName, entryKey, scope = 'global', startTime, endTime, sortOrder, limit, cursor, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/versions`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET',
        jar,
        qs: {
          datastoreName,
          scope,
          entryKey,
          startTime,
          endTime,
          sortOrder,
          limit,
          cursor
        }
      }
    };
    return http$19(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.versions = response.versions.map(version => {
            version.createdTime = new Date(version.createdTime);
            version.objectCreatedTime = new Date(version.objectCreatedTime);
            return version
          });

          resolve(response);
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

getDatastoreEntryVersions$1.func = function (args) {
  return getDatastoreEntryVersions(args.universeId, args.datastoreName, args.entryKey, args.scope, args.startTime, args.endTime, args.sortOrder, args.limit, args.cursor, args.jar)
};

var getDatastoreKeys$1 = {};

// Includes
const http$18 = http$1_.func;

// Args
getDatastoreKeys$1.required = ['universeId', 'datastoreName'];
getDatastoreKeys$1.optional = ['scope', 'prefix', 'limit', 'cursor', 'jar'];

// Docs
/**
 * <p> ☁️ Returns a list of entry keys within a data store. </p>
 * API Key Permissions:
 * <ul>
 *  <li> List keys </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {(string | boolean)=} [scope=global] - Defaults to global, similar to Lua API. If set to true, returns keys from all scopes.
 * @param {string=} prefix - Return only data stores with this prefix
 * @param {number=} limit - Maximum number of items to return
 * @param {string=} cursor - Provide to request the next set of data
 * @returns {Promise<DatastoreKeysResult>}
 * @example const noblox = require("noblox.js")
 * const keys = await noblox.getDatastoreKeys({ universeId: 127407415, datastoreName: 'LevelStore' })
**/

// Define
function getDatastoreKeys (universeId, datastoreName, scope = 'global', prefix, limit, cursor, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET',
        jar,
        qs: {
          datastoreName,
          scope,
          AllScopes: scope === true,
          prefix,
          limit,
          cursor
        }
      }
    };
    return http$18(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);

          resolve(response);
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

getDatastoreKeys$1.func = function (args) {
  return getDatastoreKeys(args.universeId, args.datastoreName, args.scope, args.prefix, args.limit, args.cursor, args.jar)
};

var getDatastores$1 = {};

// Includes
const http$17 = http$1_.func;

// Args
getDatastores$1.required = ['universeId'];
getDatastores$1.optional = ['prefix', 'limit', 'cursor', 'jar'];

// Docs
/**
 * <p> ☁️ Returns a list of data stores belonging to a universe. </p>
 * API Key Permissions:
 * <ul>
 *  <li> List DataStores </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe whose data stores are being retrieved.
 * @param {string=} prefix - Return only data stores with this prefix
 * @param {number=} limit - Maximum number of items to return
 * @param {string=} cursor - Provide to request the next set of data
 * @returns {Promise<DatastoresResult>}
 * @example const noblox = require("noblox.js")
 * const datastores = await noblox.getDatastores(1117747196)
**/

// Define
function getDatastores (universeId, prefix, limit, cursor, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores`,
      options: {
        resolveWithFullResponse: true,
        method: 'GET',
        jar,
        qs: {
          prefix,
          limit,
          cursor
        }
      }
    };
    return http$17(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.datastores = response.datastores.map(datastore => {
            datastore.createdTime = new Date(datastore.createdTime);
            return datastore
          });

          resolve(response);
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

getDatastores$1.func = function (args) {
  return getDatastores(args.universeId, args.prefix, args.limit, args.cursor, args.jar)
};

var incrementDatastoreEntry$1 = {};

// Includes
const http$16 = http$1_.func;
const crypto$1 = require$$1;

// Args
incrementDatastoreEntry$1.required = ['universeId', 'datastoreName', 'entryKey', 'incrementBy'];
incrementDatastoreEntry$1.optional = ['scope', 'robloxEntryUserIDs', 'robloxEntryAttributes', 'jar'];

// Docs
/**
 * <p> ☁️ Increments the value for an entry by a given amount, or create a new entry with that amount. </p>
 * API Key Permissions:
 * <ul>
 *  <li> Create entry </li>
 *  <li> Update entry </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {string} entryKey - The key which identifies the entry.
 * @param {number} incrementBy - The amount by which the entry should be incremented, or the starting value if it does not exist
 * @param {string=} [scope=global] - Defaults to global, similar to Lua API.
 * @param {Array<number>=} robloxEntryUserIDs - Comma-separated list of Roblox user IDs the entry is tagged with. If not provided, existing user IDs are cleared.
 * @param {object=} robloxEntryAttributes - If not provided, existing attributes are cleared.
 * @returns {Promise<DatastoreEntry>}
 * @example const noblox = require("noblox.js")
 * const entry = await noblox.incrementDatastoreEntry({ universeId: 127407415, datastoreName: 'LevelStore', entryKey: 'Level_User', incrementBy: 2 })
**/

// Define
function incrementDatastoreEntry (universeId, datastoreName, entryKey, incrementBy, scope = 'global', robloxEntryUserIDs = [], robloxEntryAttributes, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry/increment`,
      options: {
        resolveWithFullResponse: true,
        method: 'POST',
        jar,
        qs: {
          datastoreName,
          scope,
          entryKey,
          incrementBy
        },
        headers: {
          'Content-Type': 'application/json',
          'content-md5': crypto$1.createHash('md5').update(JSON.stringify(incrementBy)).digest('base64'),
          'roblox-entry-userids': JSON.stringify(robloxEntryUserIDs),
          'roblox-entry-attributes': JSON.stringify(robloxEntryAttributes),
          'content-length': '0'
        }
      }
    };
    return http$16(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          const headers = res.headers;

          resolve({
            data: response,
            metadata: {
              robloxEntryCreatedTime: new Date(headers['roblox-entry-created-time']),
              lastModified: headers['last-modified'] ? new Date(headers['last-modified']) : new Date(headers['roblox-entry-created-time']),
              robloxEntryVersion: headers['roblox-entry-version'],
              robloxEntryAttributes: headers['roblox-entry-attributes'],
              robloxEntryUserIDs: headers['roblox-entry-userids'],
              contentMD5: headers['content-md5'],
              contentLength: parseInt(headers['content-length'])
            }
          });
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

incrementDatastoreEntry$1.func = function (args) {
  return incrementDatastoreEntry(args.universeId, args.datastoreName, args.entryKey, args.incrementBy, args.scope, args.robloxEntryUserIDs, args.robloxEntryAttributes, args.jar)
};

var setDatastoreEntry$1 = {};

// Includes
const http$15 = http$1_.func;
const crypto = require$$1;

// Args
setDatastoreEntry$1.required = ['universeId', 'datastoreName', 'entryKey', 'body'];
setDatastoreEntry$1.optional = ['scope', 'matchVersion', 'exclusiveCreate', 'robloxEntryUserIDs', 'robloxEntryAttributes', 'jar'];

// Docs
/**
 * <p> ☁️ Sets the value, metadata and user IDs associated with an entry. </p>
 * <p>
 * Note: You cannot use both matchVersion and exclusiveCreate. MD5 checksum is automatically generated.
 * </p>
 * API Key Permissions:
 * <ul>
 *  <li> Create entry </li>
 *  <li> Update entry </li>
 * </ul>
 * @category Datastores
 * @param {number} universeId - The ID of the universe
 * @param {string} datastoreName - Name of the data store
 * @param {string} entryKey - The key which identifies the entry.
 * @param {any} body - The value the key should be set to.
 * @param {string=} [scope=global] - Defaults to global, similar to Lua API.
 * @param {string=} matchVersion - Only update if current version matches this.
 * @param {boolean} [exclusiveCreate=false] - Only create the entry if it does not exist.
 * @param {Array<number>=} robloxEntryUserIDs - Comma-separated list of Roblox user IDs the entry is tagged with. If not provided, existing user IDs are cleared.
 * @param {object=} robloxEntryAttributes - If not provided, existing attributes are cleared.
 * @returns {Promise<EntryVersion>}
 * @example const noblox = require("noblox.js")
 * const response = await noblox.setDatastoreEntry({ universeId: 127407415, datastoreName: 'LevelStore', entryKey: 'Level_Random', body: 230, robloxEntryUserIDs: [55549140], robloxEntryAttributes: { node: true } }))
**/

// Define
function setDatastoreEntry (universeId, datastoreName, entryKey, body, scope = 'global', matchVersion, exclusiveCreate = false, robloxEntryUserIDs = [], robloxEntryAttributes, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry`,
      options: {
        resolveWithFullResponse: true,
        method: 'POST',
        jar,
        qs: {
          datastoreName,
          scope,
          entryKey,
          matchVersion,
          exclusiveCreate
        },
        headers: {
          'Content-Type': 'application/json',
          'content-md5': crypto.createHash('md5').update(JSON.stringify(body)).digest('base64'),
          'roblox-entry-userids': JSON.stringify(robloxEntryUserIDs),
          'roblox-entry-attributes': JSON.stringify(robloxEntryAttributes)
        },
        body: JSON.stringify(body)
      }
    };
    return http$15(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);

          response.createdTime = new Date(response.createdTime);
          response.objectCreatedTime = new Date(response.objectCreatedTime);

          resolve(response);
        } else {
          // Sourced from: https://stackoverflow.com/a/32278428
          const isAnObject = (val) => !!(val instanceof Array || val instanceof Object);

          let body;

          try {
            body = isAnObject(JSON.parse(res.body)) ? JSON.parse(res.body) : {};
          } catch (error) {
            reject(new Error(`${res.statusCode} ${res.statusMessage}`));
          }

          reject(new Error(`${res.statusCode} ${body.error} ${body.message}`));
        }
      })
      .catch(error => reject(error))
  })
}

setDatastoreEntry$1.func = function (args) {
  return setDatastoreEntry(args.universeId, args.datastoreName, args.entryKey, args.body, args.scope, args.matchVersion, args.exclusiveCreate, args.robloxEntryUserIDs, args.robloxEntryAttributes, args.jar)
};

var canManage$1 = {};

// Includes
const http$14 = http$1_.func;

// Args
canManage$1.required = ['userId', 'assetId'];

// Docs
/**
 * ✅ Returns whether the user can manage a given asset.
 * @category Develop
 * @alias canManage
 * @param {number} userId - The id of the user.
 * @param {number} assetId - The id of the asset.
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * let canManage = await noblox.canManage(123456, 234567)
**/

// Define
function canManage (userId, assetId) {
  return http$14({
    url: `//develop.roblox.com/v1/user/${userId}/canmanage/${assetId}`,
    options: {
      method: 'GET',
      resolveWithFullResponse: true
    }
  })
    .then(function ({ statusCode, body }) {
      const { Success: success, CanManage: canManage, ErrorMessage: error } = JSON.parse(body);
      if (success) {
        return canManage
      } else {
        if (error) {
          throw new Error(`${error} | userId: ${userId}, assetId: ${assetId}`)
        } else {
          throw new Error(`An unknown error occurred with canManage() | [${statusCode}] userId: ${userId}, assetId: ${assetId}`)
        }
      }
    })
}

canManage$1.func = function ({ userId, assetId }) {
  return canManage(userId, assetId)
};

var updateUniverse$1 = {};

// Includes
const http$13 = http$1_.func;
const getGeneralToken$p = getGeneralToken$P.func;

// Args
updateUniverse$1.required = ['universeId', 'settings'];
updateUniverse$1.optional = ['jar'];

// Docs
/**
 * 🔐 Modifies a universe's settings
 * @category Develop
 * @alias updateUniverse
 * @param {number} universeId - The universeId of the experience
 * @param {UniverseSettings} settings - The settings to update
 * @returns {Promise<UpdateUniverseResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.updateUniverse(2421261122, { name: "The best game ever!" })
**/

// Define
function updateUniverse (universeId, settings, jar, token) {
  return new Promise((resolve, reject) => {
    return http$13({
      url: `//develop.roblox.com/v1/universes/${universeId}/configuration`,
      options: {
        method: 'PATCH',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: settings,
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve(body);
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message} | universeId: ${universeId}, settings: ${JSON.stringify(settings)} ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`));
      } else {
        reject(new Error(`An unknown error occurred with updateUniverse() | [${statusCode}] universeId: ${universeId}, settings: ${JSON.stringify(settings)}`));
      }
    }).catch(reject)
  })
}

updateUniverse$1.func = function ({ universeId, settings, jar }) {
  return getGeneralToken$p({ jar })
    .then((token) => {
      return updateUniverse(universeId, settings, jar, token)
    })
};

var updateUniverseAccess$1 = {};

// Includes
const http$12 = http$1_.func;
const getGeneralToken$o = getGeneralToken$P.func;

// Args
updateUniverseAccess$1.required = ['universeId', 'isPublic'];
updateUniverseAccess$1.optional = ['jar'];

// Docs
/**
 * 🔐 Modifies a universe's public access setting
 * @category Develop
 * @alias updateUniverseAccess
 * @param {number} universeId - The universeId of the experience
 * @param {boolean=} isPublic - The visibility and access of the universe; shuts down all running instances if set to false
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.updateUniverseAccess(2421261122, true)
**/

// Define
function updateUniverseAccess (universeId, isPublic, jar, token) {
  return new Promise((resolve, reject) => {
    return http$12({
      url: `//develop.roblox.com/v1/universes/${universeId}/${isPublic ? 'activate' : 'deactivate'}`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          universeId
        },
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve();
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message} | universeId: ${universeId}, isPublic: ${isPublic} ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`));
      } else {
        reject(new Error(`An unknown error occurred with updateUniverseAccess() | [${statusCode}] universeId: ${universeId}, isPublic: ${isPublic}`));
      }
    }).catch(error => reject(error))
  })
}

updateUniverseAccess$1.func = function ({ universeId, isPublic, jar }) {
  return getGeneralToken$o({ jar })
    .then((token) => {
      return updateUniverseAccess(universeId, isPublic, jar, token)
    })
};

var buy$1 = {};

// Includes
const http$11 = http$1_.func;
const getProductInfo = getProductInfo$2.func;
const getGeneralToken$n = getGeneralToken$P.func;

// Args
buy$1.required = [['asset', 'product']];
buy$1.optional = ['price', 'jar'];

// Docs
/**
 * 🔐 Buy an asset from the marketplace.
 * @category Assets
 * @param {number} asset - The ID of the product.
 * @param {number=} price - The price of the product.
 * @returns {Promise<BuyAssetResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.buy(1117747196)
**/

// Define
function buy (jar, token, product, price) {
  const robux = product.PriceInRobux || 0;
  const productId = product.ProductId;
  if (price) {
    if (typeof price === 'number') {
      if (robux !== price) {
        throw new Error('Price requirement not met. Requested price: ' + price + ' Actual price: ' + robux)
      }
    } else if (typeof price === 'object') {
      const high = price.high;
      const low = price.low;
      if (high) {
        if (robux > high) {
          throw new Error('Price requirement not met. Requested price: <=' + high + ' Actual price: ' + robux)
        }
      }
      if (low) {
        if (robux < low) {
          throw new Error('Price requirement not met. Requested price: >=' + low + ' Actual price: ' + robux)
        }
      }
    }
  }
  const httpOpt = {
    url: '//economy.roblox.com/v1/purchases/products/' + productId,
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      json: {
        expectedCurrency: 1,
        expectedPrice: robux,
        expectedSellerId: product.Creator.Id
      }
    }
  };
  return http$11(httpOpt)
    .then(function (json) {
      let err = json.errorMsg;
      if (json.reason === 'InsufficientFunds') {
        err = 'You need ' + json.shortfallPrice + ' more robux to purchase this item.';
      } else if (json.errorMsg) {
        err = json.errorMsg;
      }
      if (!err) {
        return { productId, price: robux }
      } else {
        throw new Error(err)
      }
    })
}

function runWithToken$2 (args) {
  const jar = args.jar;
  return getGeneralToken$n({
    jar
  })
    .then(function (token) {
      return buy(jar, token, args.product, args.price)
    })
}

buy$1.func = function (args) {
  if (!args.product) {
    return getProductInfo({
      asset: args.asset
    })
      .then(function (product) {
        args.product = product;
        return runWithToken$2(args)
      })
  } else {
    return runWithToken$2(args)
  }
};

var getGroupFunds$1 = {};

// Includes
const http$10 = http$1_.func;

// Args
getGroupFunds$1.required = ['group'];
getGroupFunds$1.optional = ['jar'];

// Docs
/**
 * 🔓 Gets the amount of robux in a group.
 * @category Group
 * @alias getGroupFunds
 * @param {number} group - The id of the group
 * @returns {Promise<number>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie (optional if group funds are public)
 * let robux = await noblox.getGroupFunds(9997719)
**/

// Define
function getGroupFunds (group, jar) {
  return http$10({
    url: `//economy.roblox.com/v1/groups/${group}/currency`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { robux, errors } = JSON.parse(body);
      if (statusCode === 200) {
        return robux
      } else if (statusCode === 400 || statusCode === 403) {
        throw new Error(`${errors[0].message} | groupId: ${group}`)
      } else {
        throw new Error(`An unknown error occurred with getGroupFunds() | [${statusCode}] groupId: ${group}`)
      }
    })
}

getGroupFunds$1.func = function ({ group, jar }) {
  return getGroupFunds(group, jar)
};

var getGroupRevenueSummary$1 = {};

// Includes
const http$$ = http$1_.func;

// Args
getGroupRevenueSummary$1.required = ['groupId'];
getGroupRevenueSummary$1.optional = ['timeFrame', 'jar'];

// Docs
/**
 * 🔐 Gets recent Robux revenue summary for a group; shows pending Robux. | Requires "Spend group funds" permissions.
 * @category Group
 * @alias getGroupRevenueSummary
 * @param {number} groupId - The group id to get Robux summary for.
 * @param {("Day" | "Week" | "Month" | "Year")=} [timeFrame="Month"] - The time frame to get for.
 * @returns {Promise<RevenueSummaryResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * let revenueSummary = await noblox.getGroupRevenueSummary(9997719, "Year")
**/

// Define
function getGroupRevenueSummary (group, timeFrame, jar) {
  return http$$({
    url: `//economy.roblox.com/v1/groups/${group}/revenue/summary/${timeFrame}`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors } = JSON.parse(body);
      if (statusCode === 200) {
        return JSON.parse(body)
      } else if (statusCode === 400) {
        throw new Error(`${errors[0].message} | group: ${group}, timeFrame: ${timeFrame}`)
      } else if (statusCode === 401) {
        throw new Error(`${errors[0].message} (Are you logged in?) | group: ${group}, timeFrame: ${timeFrame}`)
      } else if (statusCode === 403) {
        throw new Error('Insufficient permissions: "Spend group funds" role permissions required')
      } else {
        throw new Error(`An unknown error occurred with getGroupRevenueSummary() | [${statusCode}] group: ${group}, timeFrame: ${timeFrame}`)
      }
    })
}

getGroupRevenueSummary$1.func = function ({ groupId, timeFrame = 'Month', jar }) {
  return getGroupRevenueSummary(groupId, timeFrame, jar)
};

var getGroupTransactions$1 = {};

const getPageResults$c = getPageResults$f.func;

getGroupTransactions$1.required = ['group'];
getGroupTransactions$1.optional = ['transactionType', 'limit', 'sortOrder', 'jar'];

// Docs
/**
 * 🔐 Get a group's transactions.
 * @category Group
 * @alias getGroupTransactions
 * @param {number} group - The id of the group.
 * @param {("Sale" | "Purchase" | "AffiliateSale" | "DevEx" | "GroupPayout" | "AdImpressionPayout")} [transactionType=Sale] - The transaction type.
 * @param {number} limit - The number of transactions being fetched in total.
 * @param {SortOrder=} [sortOrder=Asc] - The cursor for the next page.
 * @returns {Promise<TransactionItem[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const transactions = await noblox.getGroupTransactions(1, "Sale")
**/

// Define
getGroupTransactions$1.func = function (args) {
  return getPageResults$c({
    jar: args.jar,
    url: `//economy.roblox.com/v2/groups/${args.group}/transactions`,
    query: {
      transactionType: args.transactionType || 'Sale'
    },
    sortOrder: args.sortOrder || 'Asc',
    limit: args.limit
  })
};

var getResaleData$1 = {};

// Includes
const http$_ = http$1_.func;

// Args
getResaleData$1.required = ['assetId'];
getResaleData$1.optional = ['jar'];

// Docs
/**
 * ✅ Get the recent sale history (price and volume per day for 180 days) of a limited asset.
 * @category Assets
 * @alias getResaleData
 * @param {number} assetId - The id of the asset.
 * @returns {Promise<ResaleDataResponse>}
 * @example const noblox = require("noblox.js")
 * const resaleData = await noblox.getResaleData(20573078)
**/

// Define
const getResaleData = async (assetId) => {
  return http$_({
    url: `//economy.roblox.com/v1/assets/${assetId}/resale-data`,
    options: {
      resolveWithFullResponse: true
    }
  }).then(({ body, statusCode }) => {
    const { errors } = JSON.parse(body);
    if (statusCode === 200) {
      try {
        const resaleData = JSON.parse(body);
        for (const priceDataPoint of resaleData.priceDataPoints) {
          priceDataPoint.date = new Date(priceDataPoint.date);
        }
        for (const volumeDataPoint of resaleData.volumeDataPoints) {
          volumeDataPoint.date = new Date(volumeDataPoint.date);
        }
        return resaleData
      } catch (err) {
        throw new Error(`An unknown error occurred with getResaleData() | [${statusCode}] assetId: ${assetId}`)
      }
    } else if (statusCode === 400) {
      throw new Error(`${errors[0].message} | assetId: ${assetId}`)
    } else {
      throw new Error(`An unknown error occurred with getResaleData() | [${statusCode}] assetId: ${assetId}`)
    }
  })
};

getResaleData$1.func = function ({ assetId }) {
  if (isNaN(assetId)) {
    throw new Error('The provided assetId is not a number.')
  }
  return getResaleData(assetId)
};

var getResellers$1 = {};

// Includes
const getPageResults$b = getPageResults$f.func;

// Args
getResellers$1.required = ['assetId'];
getResellers$1.optional = ['limit', 'jar'];

// Docs
/**
 * 🔐 Gets available resale copies of a limited asset.
 * @category Assets
 * @alias getResellers
 * @param {number} assetId - The id of the asset.
 * @param {Limit=} limit - The max number of resellers to return.
 * @returns {Promise<ResellerData[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const resellers = await noblox.getResellers(20573078)
**/

// Define
const getResellers = async (assetId, limit, jar) => {
  return getPageResults$b({
    url: `//economy.roblox.com/v1/assets/${assetId}/resellers`,
    limit,
    jar
  })
};

getResellers$1.func = function ({ assetId, limit, jar }) {
  if (isNaN(assetId)) {
    throw new Error('The provided assetId ID is not a number.')
  }
  return getResellers(assetId, limit, jar)
};

var getUserFunds$1 = {};

// Includes
const http$Z = http$1_.func;

// Args
getUserFunds$1.required = ['userId'];
getUserFunds$1.optional = ['jar'];

// Docs
/**
 * 🔓 Gets the amount of robux for the authenticated user.
 * @category User
 * @param {number} userId - Must match the userId of the authenticated user
 * @alias getUserFunds
 * @returns {Promise<number>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const currentUser = await noblox.setCookie(process.env.ROBLOXCOOKIE)
 * const robux = await noblox.getUserFunds(currentUser.id)
 */

// Define
function getUserFunds (userId, jar) {
  return http$Z({
    url: `//economy.roblox.com/v1/users/${userId}/currency`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { robux, errors } = JSON.parse(body);
      if (statusCode === 200) {
        return robux
      } else if (statusCode === 400 || statusCode === 403) {
        throw new Error(`${errors[0].message} | userId: ${userId}`)
      } else {
        throw new Error(`An unknown error occurred with getUserFunds() | [${statusCode}] userId: ${userId}`)
      }
    })
}

getUserFunds$1.func = function ({ userId, jar }) {
  return getUserFunds(userId, jar)
};

var getUserTransactions = {};

var getCurrentUser = {};

var hasRequiredGetCurrentUser;

function requireGetCurrentUser () {
	if (hasRequiredGetCurrentUser) return getCurrentUser;
	hasRequiredGetCurrentUser = 1;
	// Includes
	const settings = require$$196;

	const noblox = /*@__PURE__*/ requireLib();

	getCurrentUser.optional = ['option', 'jar'];

	// Docs
	/**
	 * 🔐 Get the current logged in user.
	 * @category Utility
	 * @alias getCurrentUser
	 * @param {string=} option - A specific option to return.
	 * @returns {LoggedInUserData}
	 * @example const noblox = require("noblox.js")
	 * @deprecated getCurrentUser() is deprecated; see getAuthenticatedUser(), getPremium(), getThumbnails(), getUserFunds() instead | August 27, 2024 - https://devforum.roblox.com/t/official-list-of-deprecated-web-endpoints/62889/66
	 * // Login using your cookie.
	 * const user = await noblox.getCurrentUser()
	**/

	// Define
	getCurrentUser.func = async function (args) {
	  const jar = args.jar;
	  const option = args.option;
	  if (settings.show_deprecation_warnings) {
	    console.warn('[DEPRECATED]: getCurrentUser() is deprecated by Roblox; use getAuthenticatedUser(), getPremium(), getThumbnails(), or getUserFunds() instead!');
	    console.warn(' > Opt out of these warnings using noblox.setOptions({ show_deprecation_warnings: false })');
	  }

	  const currentUser = await noblox.getAuthenticatedUser(jar);
	  const [premiumStatus, thumbnailResponse, robuxBalance] = await Promise.all(
	    [
	      noblox.getPremium(currentUser.id, jar),
	      noblox.getPlayerThumbnail(currentUser.id, '352x352', 'png', false, 'Body', jar),
	      noblox.getUserFunds(currentUser.id, jar)
	    ]
	  );

	  const json = {
	    UserID: currentUser.id,
	    UserName: currentUser.name,
	    RobuxBalance: robuxBalance,
	    ThumbnailUrl: thumbnailResponse[0].imageUrl,
	    IsAnyBuildersClubMember: false,
	    IsPremium: premiumStatus,
	    DEPRECATION_WARNING: '[DEPRECATED]: noblox.getCurrentUser() is deprecated; use getAuthenticatedUser(), getPremium(), getThumbnails(), or getUserFunds() instead!'
	  };

	  if (!option) {
	    return json
	  }

	  // Support queried rgequests `getCurrentUser('UserID') -> only UserID`
	  const searchKey = Object.keys(json).filter((key) => {
	    return option.toLowerCase() === key.toLowerCase()
	  })[0];
	  return json[searchKey]
	};
	return getCurrentUser;
}

var hasRequiredGetUserTransactions;

function requireGetUserTransactions () {
	if (hasRequiredGetUserTransactions) return getUserTransactions;
	hasRequiredGetUserTransactions = 1;
	const getPageResults = getPageResults$f.func;
	const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;

	getUserTransactions.required = [];
	getUserTransactions.optional = ['transactionType', 'limit', 'sortOrder', 'jar'];

	// Docs
	/**
	 * 🔐 Get a user's transactions.
	 * @category User
	 * @alias getUserTransactions
	 * @param {("Sale" | "Purchase" | "AffiliateSale" | "DevEx" | "GroupPayout" | "AdImpressionPayout")} [transactionType=Sale] - The type of transactions being fetched.
	 * @param {number} limit - The number of transactions being fetched in total.
	 * @param {SortOrder=} [sortOrder=Asc] - The cursor for the next page.
	 * @returns {Promise<TransactionItem[]>}
	 * @example const noblox = require("noblox.js")
	 * // Login using your cookie
	 * let transactions = await noblox.getUserTransactions("Sale", 10)
	**/

	getUserTransactions.func = async function (args) {
	  const jar = args.jar;
	  const currentUser = await getCurrentUser({ jar });
	  // return getTransactions(currentUser.UserID, transactionType, limit, cursor)
	  return getPageResults({
	    jar: args.jar,
	    url: `//economy.roblox.com/v2/users/${currentUser.UserID}/transactions`,
	    query: {
	      transactionType: args.transactionType || 'Sale'
	    },
	    sortOrder: args.sortOrder || 'Asc',
	    limit: args.limit
	  })
	};
	return getUserTransactions;
}

var onGroupTransaction = {};

var shortPoll$7 = {};

class TimeoutError extends Error {
}

/**
 * A basic replacement for the Bluebird 'timeout' method. Returns a Promise which will resolve or reject with the result of the given
 * promise once it resolves, or reject if the promise should fail to resolve within the supplied timeout. An optional reason
 * can also be supplied.
 * @param promise - The Promise to apply a timeout to.
 * @param timeoutTime - The timeout to apply to the Promise.
 * @param reason - Optional String reason for the timeout.
 * @returns {Promise<unknown>}
 */
function timeout$2 (promise, timeoutTime, reason = 'operation timed out') {
  let timer;

  const timeoutPromise = new Promise(function (resolve, reject) {
    timer = setTimeout(function () {
      return reject(new TimeoutError(reason))
    }, timeoutTime);
  });

  // We return the first promise to complete. If it resolves normally, the normal promise completed - so we cancel the timer
  // to prevent any unnecessary hanging waiting for timeout timers.
  return Promise.race([promise, timeoutPromise])
    .finally(function () {
      clearTimeout(timer);
    })
}

var timeout_1 = timeout$2;

// Dependencies
const events$a = require$$0$2;

// Includes
const settings$7 = require$$196;
const promiseTimeout$2 = timeout_1;

// Args
shortPoll$7.required = ['getLatest', 'delay'];
shortPoll$7.optional = ['timeout'];

// Docs
/**
 * @typedef {function} getLatest
 * @param {number} latest - A value representing the latest version.
 * @param {EventEmitter} event - The event emitter to emit to.
*/

/**
 * ✅ This is the base for events that do not rely on true streams. The `getLatest` function receives some value that represents the latest version of something (eg. a date or unique ID) and determines if there is new information, every time it is fired it waits `delay` ms before being fired again. Every time it must return an object with the field `latest`, representing the latest value (which will not change if new information was not received), and an array `data` which has the new values (if there are multiple they each have their own index, if there is only one then it is by itself in the array). If `latest` is equal to -2, the returned data will be processed even if it is the initial run (which usually only establishes the latest value). If the return object has a true `repeat` value, the function latest will be run again immediately after. If `delay` is a string it will take the number from that string key in the `event` object of the settings.json file.
 * When the function is first called it will initialize `getLatest` with the value -1 and then emit the `connect` event. Whenever data is received, it will emit the `data` event for each value. If the `close` event is emitted the function will no longer run. If an error occurs the `error` event will be emitted, the function will log a retry and after the number of max retries as specified by settings, it will emit the `close` event.
 * The `getLatest` function will be marked as failed if it does not resolve within `timeout` ms (which can be disabled if timeout is negative). If getLatest fails for any reason (including timeout) it will be retried `maxRetries` times before stopping.
 * @category Utility
 * @alias shortPoll
 * @param {function} getLatest - The function to use to get the latest. Should return an object with key 'data' - an array containing output data,
 * and the new 'latest' value.
 * @returns {Promise<GetLatestResponse>}
**/

// Define
shortPoll$7.func = function (args) {
  const latest = args.getLatest;
  let delay = args.delay;
  delay = (typeof delay === 'string' || delay instanceof String ? settings$7.event[delay] : delay) || settings$7.event.defaultDelay;
  let retries = 0;
  const max = settings$7.event.maxRetries;
  const timeout = args.timeout || settings$7.event.timeout;
  let stop = false;
  let current;
  const evt = new events$a.EventEmitter();
  const run = function (value) {
    if (stop) {
      return
    }
    let promise = latest(value, evt);
    if (timeout > 0) {
      promise = promiseTimeout$2(promise, timeout);
    }
    return promise.then(function (response) {
      if (stop) {
        return
      }
      if (value === -1) {
        current = response.latest;
      }
      retries = 0;
      const data = response.data;
      if (data.length > 0 && (value !== -1 || current === -2)) {
        current = response.latest;
        for (let i = 0; i < data.length; i++) {
          evt.emit('data', data[i]);
        }
      }
      if (response.repeat) {
        run(current);
      } else {
        setTimeout(run, delay, current);
      }
      return response
    })
      .catch(function (err) {
        if (stop) {
          return
        }
        evt.emit('error', err);
        retries++;
        if (retries > max) {
          evt.emit('close', new Error('Max retries reached'));
        } else {
          setTimeout(run, delay, current);
        }
      })
  };

  run(-1)
    .then(function (response) {
      if (stop) {
        return
      }
      evt.emit('connect', response.latest);
    })
    .catch(function (err) {
      evt.emit('close', new Error('Initialization failed: ' + err.message));
    });
  evt.on('close', function (err) {
    stop = true;
    if (err) {
      evt.emit('error', err);
    }
  });
  return evt
};

// Includes
const shortPoll$6 = shortPoll$7.func;
const getGroupTransactions = getGroupTransactions$1.func;

// Args
onGroupTransaction.required = ['groupId', 'transactionType'];
onGroupTransaction.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a group transaction is made, for example a purchase. This event has a rate of one request per 60
 * sec, which is more than the typical 10 seconds. This is due to the unusually low rate limit on the transactions
 * endpoint.
 *
 * Note: The `created` field returned by this event will always have 0 milliseconds. This is due to a quirk on Roblox's side:
 * These millisecond values fluctuate, meaning the event can misfire. Removing them avoids this problem.
 * @category Group
 * @alias onGroupTransaction
 * @param {number} groupId - The id of the group.
 * @param {("Sale" | "Purchase" | "AffiliateSale" | "DevEx" | "GroupPayout" | "AdImpressionPayout")} transactionType - The transaction type.
 * @returns An EventEmitter that emits when a transaction is made.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const transactionEvent = noblox.onGroupTransaction(1)
 * transactionEvent.on("data", function(data) {
 *  console.log("New Transaction!", data)
 * })
 * transactionEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
 **/

// Define
onGroupTransaction.func = function (args) {
  let empty = true;
  return shortPoll$6({
    getLatest: function (latest) {
      return getGroupTransactions({ group: args.groupId, jar: args.jar, transactionType: args.transactionType })
        .then(function (transactions) {
          const given = [];
          // This method works much in the same way as onAuditLog. We remove some of the precision from transaction dates
          // Because Roblox has a habit of being imprecise and varying the milliseconds of a given transaction/log item
          // across different requests - and this causes duplicate fires.
          if (transactions) {
            for (const key in transactions) {
              if (Object.prototype.hasOwnProperty.call(transactions, key)) {
                const date = transactions[key].created;
                date.setMilliseconds(0);

                if (date > latest) {
                  latest = date;
                  given.push(transactions[key]);
                }
                empty = false;
              } else if (!empty) {
                const date = new Date();
                date.setMilliseconds(0);

                given.push({ date });
                latest = date;
                empty = true;
              }
            }
            return {
              latest,
              data: given
            }
          }
        })
    },
    delay: 'onGroupTransaction'
  })
};

var acceptFriendRequest$1 = {};

// Includes
const http$Y = http$1_.func;
const getGeneralToken$m = getGeneralToken$P.func;

// Args
acceptFriendRequest$1.required = ['userId'];
acceptFriendRequest$1.optional = ['jar'];

// Docs
/**
 * 🔐 Accept a user's friend request.
 * @category User
 * @alias acceptFriendRequest
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.acceptFriendRequest(123456)
**/

// Define
function acceptFriendRequest (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/accept-friend-request`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/json'
        },
        resolveWithFullResponse: true
      }
    };
    return http$Y(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

acceptFriendRequest$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$m({ jar })
    .then(function (xcsrf) {
      return acceptFriendRequest(jar, xcsrf, args.userId)
    })
};

var declineAllFriendRequests$1 = {};

// Includes
const http$X = http$1_.func;
const getGeneralToken$l = getGeneralToken$P.func;

// Args
declineAllFriendRequests$1.required = [];
declineAllFriendRequests$1.optional = ['jar'];

// Docs
/**
 * 🔐 Decline all incoming friend requests.
 * @category User
 * @alias declineAllFriendRequests
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.declineAllFriendRequests()
**/

// Define
function declineAllFriendRequests (jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//friends.roblox.com/v1/user/friend-requests/decline-all',
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$X(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

declineAllFriendRequests$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$l({ jar })
    .then(function (xcsrf) {
      return declineAllFriendRequests(jar, xcsrf)
    })
};

var declineFriendRequest$1 = {};

// Includes
const http$W = http$1_.func;
const getGeneralToken$k = getGeneralToken$P.func;

// Args
declineFriendRequest$1.required = ['userId'];
declineFriendRequest$1.optional = ['jar'];

// Docs
/**
 * 🔐 Decline a user's friend request.
 * @category User
 * @alias declineFriendRequest
 * @param {number} userId - The id of the user that sent the friend request that is being declined.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.declineFriendRequest(123456)
**/

// Define
function declineFriendRequest (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/decline-friend-request`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/json'
        },
        resolveWithFullResponse: true
      }
    };
    return http$W(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

declineFriendRequest$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$k({ jar })
    .then(function (xcsrf) {
      return declineFriendRequest(jar, xcsrf, args.userId)
    })
};

var getFollowerCount$1 = {};

// Includes
const http$V = http$1_.func;

// Args
getFollowerCount$1.required = ['userId'];

// Docs
/**
 * ✅ Gets the number of followers a user has.
 * @category User
 * @alias getFollowerCount
 * @param { number } userId
 * @returns Promise<number>
 * @example const noblox = require("noblox.js")
 * const numberOfFollowers = await noblox.getFollowerCount(55549140)
**/

// Define
getFollowerCount$1.func = function (args) {
  const httpOpt = {
    url: `//friends.roblox.com/v1/users/${args.userId}/followers/count`,
    options: {
      json: true,
      method: 'GET',
      resolveWithFullResponse: true
    }
  };

  return http$V(httpOpt).then(function (res) {
    if (res.statusCode === 200) { return res.body.count }

    throw new Error(
      `Failed to retrieve follower count: (${res.statusCode}) ${JSON.stringify(res.body)}`
    )
  })
};

var getFollowers$1 = {};

// Includes
const http$U = http$1_.func;

// Args
getFollowers$1.required = ['userId'];
getFollowers$1.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * ✅ Get a user's followers.
 * @category User
 * @alias getFollowers
 * @param {number} userId - The id of the user whose followers are being returned.
 * @param {Limit=} [limit=10] - The amount of followers being fetched each request.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data should be sorted by (Asc or Desc)
 * @param {string=} cursor - The cursor for the previous or next page.
 * @returns {Promise<FollowersPage>}
 * @example const noblox = require("noblox.js")
 * let followers = await noblox.getFollowers(123456, "Asc", 10)
**/

// Define
function getFollowers (jar, userId, sortOrder, limit, cursor) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/followers?limit=${limit}&sortOrder=${sortOrder}&cursor=${cursor}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$U(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.data = response.data.map((entry) => {
            entry.created = new Date(entry.created);
            return entry
          });
          resolve(response);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getFollowers$1.func = function (args) {
  const jar = args.jar;
  const sortOrder = args.sortOrder || 'Asc';
  const limit = args.limit || (10).toString();
  const cursor = args.cursor || '';
  return getFollowers(jar, args.userId, sortOrder, limit, cursor)
};

var getFollowingCount$1 = {};

// Includes
const http$T = http$1_.func;

// Args
getFollowingCount$1.required = ['userId'];

// Docs
/**
 * ✅ Gets the number of users a user is following.
 * @category User
 * @alias getFollowingCount
 * @param { number } userId
 * @returns Promise<number>
 * @example const noblox = require("noblox.js")
 * const numberOfFollowings = await noblox.getFollowingCount(55549140)
**/

// Define
getFollowingCount$1.func = function (args) {
  const httpOpt = {
    url: `//friends.roblox.com/v1/users/${args.userId}/followings/count`,
    options: {
      json: true,
      method: 'GET',
      resolveWithFullResponse: true
    }
  };

  return http$T(httpOpt).then(function (res) {
    if (res.statusCode === 200) { return res.body.count }

    throw new Error(
      `Failed to retrieve following count: (${res.statusCode}) ${JSON.stringify(res.body)}`
    )
  })
};

var getFollowings$1 = {};

// Includes
const http$S = http$1_.func;

// Args
getFollowings$1.required = ['userId'];
getFollowings$1.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * ✅ Get the users followed by the user.
 * @category User
 * @alias getFollowings
 * @param {number} userId - The id of the user.
 * @param {Limit=} [limit=10] - The amount of users fetched by each request (10, 25, 50, 100)
 * @param {SortOrder=} [sortOrder=Asc] - The order that the returned data will be sorted by (Asc or Desc)
 * @param {string=} cursor - The previous or next page's cursor.
 * @returns {Promise<FollowingsPage>}
 * @example const noblox = require("noblox.js")
 * let following = await noblox.getFollowings(123456, "Asc", 50)
**/

// Define
function getFollowings (jar, userId, sortOrder, limit, cursor) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/followings?limit=${limit}&sortOrder=${sortOrder}&cursor=${cursor}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$S(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.data = response.data.map((entry) => {
            entry.created = new Date(entry.created);
            return entry
          });
          resolve(response);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getFollowings$1.func = function (args) {
  const jar = args.jar;
  const sortOrder = args.sortOrder || 'Asc';
  const limit = args.limit || (10).toString();
  const cursor = args.cursor || '';
  return getFollowings(jar, args.userId, sortOrder, limit, cursor)
};

var getFriendCount$2 = {};

// Includes
const http$R = http$1_.func;

// Args
getFriendCount$2.required = ['userId'];

// Docs
/**
 * ✅ Gets the number of friends a user has.
 * @category User
 * @alias getFriendCount
 * @param { number } userId
 * @returns Promise<number>
 * @example const noblox = require("noblox.js")
 * const numberOfFriends = await noblox.getFriendCount(55549140)
**/

// Define
getFriendCount$2.func = function (args) {
  const httpOpt = {
    url: `//friends.roblox.com/v1/users/${args.userId}/friends/count`,
    options: {
      json: true,
      method: 'GET',
      resolveWithFullResponse: true
    }
  };

  return http$R(httpOpt).then(function (res) {
    if (res.statusCode === 200) { return res.body.count }

    throw new Error(
      `Failed to retrieve friend count: (${res.statusCode}) ${JSON.stringify(res.body)}`
    )
  })
};

var getFriendRequests = {};

// Includes
const http$Q = http$1_.func;

// Args
getFriendRequests.required = [];
getFriendRequests.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * 🔐 Get the friend requests of the authenticated user.
 * @category User
 * @alias getFriendRequests
 * @param {SortOrder=} [sortOrder=Asc] - The order of the returned data (Asc or Desc)
 * @param {Limit=} [limit=10] - The number of users returned by each request.
 * @param {string=} cursor - The previous or next page's cursor.
 * @returns {Promise<FriendRequestsPage>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * let friendRequests = await noblox.getFriendRequests({sortOrder: "Desc", limit: 100})
**/

// Define
function getFriendsRequests (args) {
  return new Promise((resolve, reject) => {
    const jar = args.jar;
    const httpOpt = {
      url: '//friends.roblox.com/v1/my/friends/requests',
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$Q(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.data = response.data.map((entry) => {
            entry.created = new Date(entry.created);
            return entry
          });
          resolve(response);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getFriendRequests.func = getFriendsRequests;

var getFriends$1 = {};

// Includes
const http$P = http$1_.func;
// Args
getFriends$1.required = ['userId'];
getFriends$1.optional = ['jar'];

// Docs
/**
 * ✅ Get the friends of a user
 * @category User
 * @alias getFriends
 * @param {number} userId - The id of the user whose friends are being returned.
 * @returns {Promise<Friends>}
 * @example const noblox = require("noblox.js")
 * let friends = await noblox.getFriends(123456)
**/

// Define
function getFriends (jar, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/friends`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$P(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const response = JSON.parse(res.body);
          response.data = response.data.map((entry) => {
            entry.created = new Date(entry.created);
            return entry
          });
          resolve(response);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getFriends$1.func = function (args) {
  return getFriends(args.jar, args.userId)
};

var onFriendRequest = {};

// Dependencies
const events$9 = require$$0$2;

// Includes
const onNotification$9 = onNotification$f.func;

// Args
onFriendRequest.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a user sends you a friend request.
 * @category User
 * @alias onFriendRequest
 * @returns An EventEmitter that emits when a user sends you a friend request.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 *
 * const friendRequestEvent = noblox.onFriendRequest()
 * friendRequestEvent.on("data", function(data) {
 *  console.log("New friend request! ", data)
 * })
 * friendRequestEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onFriendRequest.func = function (args) {
  const jar = args.jar;
  const onFriendRequest = new events$9.EventEmitter();
  const notifications = onNotification$9({ jar });
  notifications.on('data', function (name, message) {
    if (name === 'FriendshipNotifications' && message.Type === 'FriendshipRequested') {
      onFriendRequest.emit('data', message.EventArgs.UserId1);
    }
  });
  notifications.on('error', function (err) {
    onFriendRequest.emit('error', err);
  });
  notifications.on('connect', function () {
    onFriendRequest.emit('connect');
  });
  notifications.on('close', function (internal) {
    if (internal) {
      return
    }
    onFriendRequest.emit('close', true);
  });
  onFriendRequest.on('close', function (internal) {
    if (internal) {
      return
    }
    notifications.emit('close', true);
  });
  return onFriendRequest
};

var removeFriend$1 = {};

// Includes
const http$O = http$1_.func;
const getGeneralToken$j = getGeneralToken$P.func;

// Args
removeFriend$1.required = ['userId'];
removeFriend$1.optional = ['jar'];

// Docs
/**
 * 🔐 Remove a user from your friends list.
 * @category User
 * @alias removeFriend
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.removeFriend(123456)
**/

// Define
function removeFriend (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/unfriend`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$O(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

removeFriend$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$j({ jar })
    .then(function (xcsrf) {
      return removeFriend(jar, xcsrf, args.userId)
    })
};

var sendFriendRequest$1 = {};

// Includes
const http$N = http$1_.func;
const getGeneralToken$i = getGeneralToken$P.func;

// Args
sendFriendRequest$1.required = ['userId'];
sendFriendRequest$1.optional = ['jar'];

// Docs
/**
 * 🔐 Send a friend request to a user.
 * @category User
 * @alias sendFriendRequest
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.sendFriendRequest(123456)
**/

// Define
function sendFriendRequest (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/request-friendship`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/json'
        },
        resolveWithFullResponse: true
      }
    };
    return http$N(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

sendFriendRequest$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$i({ jar })
    .then(function (xcsrf) {
      return sendFriendRequest(jar, xcsrf, args.userId)
    })
};

var unfollow$1 = {};

// Includes
const http$M = http$1_.func;
const getGeneralToken$h = getGeneralToken$P.func;

// Args
unfollow$1.required = ['userId'];
unfollow$1.optional = ['jar'];

// Docs
/**
 * 🔐 Unfollow a user.
 * @category User
 * @alias unfollow
 * @param {number} userId - The id of the user.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.unfollow(123456)
**/

// Define
function unfollow (jar, token, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//friends.roblox.com/v1/users/${userId}/unfollow`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$M(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

unfollow$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$h({ jar })
    .then(function (xcsrf) {
      return unfollow(jar, xcsrf, args.userId)
    })
};

var addDeveloperProduct = {};

const http$L = http$1_.func;
const getGeneralToken$g = getGeneralToken$P.func;

addDeveloperProduct.required = ['universeId', 'name', 'priceInRobux'];
addDeveloperProduct.optional = ['description', 'jar'];

// Docs
/**
 * 🔐 Create a developer product.
 * @category Game
 * @alias addDeveloperProduct
 * @param {number} universeId - The id of the universe.
 * @param {string} name - The name of the developer product.
 * @param {number} priceInRobux - The price of the product.
 * @param {string=} description - The description of the developer product.
 * @returns {Promise<DeveloperProductAddResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.addDeveloperProduct(1, "A Developer Product", 100, "A cool item.")
**/

const nextFunction = (jar, token, universeId, name, priceInRobux, description) => {
  description = description || '';
  return http$L({
    url: '//apis.roblox.com/developer-products/v1/universes/' + universeId + '/developerproducts?name=' + name + '&description=' + description + '&priceInRobux=' + priceInRobux,
    options: {
      method: 'POST',
      jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      resolveWithFullResponse: true
    }
  }).then(function (res) {
    try {
      const json = JSON.parse(res.body);
      if (res.statusCode === 200) {
        return json
      }
      throw new Error(json)
    } catch (err) {
      throw new Error(res.body)
    }
  })
};

addDeveloperProduct.func = (args) => {
  const jar = args.jar;

  return getGeneralToken$g({ jar }).then((xcsrf) => {
    return nextFunction(jar, xcsrf, args.universeId, args.name, args.priceInRobux, args.description)
  })
};

var configureGamePass$1 = {};

// Includes
const http$K = http$1_.func;
const getGeneralToken$f = getGeneralToken$P.func;

// Args
configureGamePass$1.required = ['gamePassId', 'name'];
configureGamePass$1.optional = ['description', 'price', 'icon', 'jar'];

// Docs
/**
 * 🔐 Modifies an existing game pass.
 * @category Game
 * @alias configureGamePass
 * @param {number} gamePassId - The id of the game pass.
 * @param {string} name - The name of the game pass; skips name, description, and icon if set to "".
 * @param {string=} description - The description of the game pass; description is updated when name is modified.
 * @param {number|boolean=} price - The price of the game pass in Robux; sets to 'Off Sale' if 0, false, or a negative value; skips if true.
 * @param {ReadStream=} icon - The read stream for the game pass icon being uploaded; .png, .jpg, .gif
 * @returns {Promise<GamePassResponse>}
 * @example const noblox = require("noblox.js")
 * const fs = require("fs")
 * // Login using your cookie
 * noblox.configureGamePass(12345678, "Game Pass Title", "Game Pass Description", 1234, fs.createReadStream("./Image.png"))
 **/

// Define
function configureGamePass (gamePassId, name, description, price, icon, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/game-passes/v1/game-passes/${gamePassId}/details`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true,
        formData: {
          Name: name,
          Description: description,
          File: icon
        }
      }
    };

    // Skip updating name and description if name is empty.
    if (!name) {
      resolve({
        gamePassId,
        ...price
      });
    }

    return http$K(httpOpt).then(function (res) {
      if (res.statusCode === 200) {
        resolve({
          gamePassId,
          name,
          description: description || '',
          ...price,
          iconChanged: !!icon // Boolean Cast
        });
      } else {
        const priceComment = (typeof (price) === 'number') ? ` | NOTE: Price has successfully been changed to ${price}R.` : '';
        if (res.statusCode === 403) {
          reject(new Error(`You do not have permission to edit this game pass.${priceComment}`));
        } else {
          reject(new Error(`An unexpected error occurred with status code ${res.statusCode}.${priceComment}`));
        }
      }
    }).catch(error => reject(error))
  })
}

// Configuring the name/description and Robux must be done in separate calls, albeit to the same end-point.
function configureRobux (args, token) {
  const httpOpt = {
    url: `//apis.roblox.com/game-passes/v1/game-passes/${args.gamePassId}/details`,
    options: {
      method: 'POST',
      jar: args.jar,
      headers: {
        'X-CSRF-TOKEN': token
      },
      resolveWithFullResponse: true,
      formData: {
        IsForSale: (!!Math.max(args.price, 0)).toString(), // Boolean Cast
        Price: Math.floor(args.price || 0).toString() // Prevent Decimals
      }
    }
  };
  return http$K(httpOpt).then(function (res) {
    if (res.statusCode === 200) {
      // Passing price as an object, so they can be omitted if configureRobux is not run.
      return configureGamePass(
        args.gamePassId,
        args.name,
        args.description,
        {
          price: Math.max(Math.floor(args.price || 0), 0),
          isForSale: !!Math.max(args.price, 0)
        },
        args.icon,
        args.jar,
        token
      )
    } else {
      if (res.statusCode === 403) {
        throw new Error('You do not have permission to edit this game pass.')
      } else {
        throw new Error(res.body.errors || 'An unknown error occurred with status code ' + res.statusCode)
      }
    }
  })
}

configureGamePass$1.func = function (args) {
  const jar = args.jar;

  return getGeneralToken$f({
    jar
  }).then(function (token) {
    // Needs to catch falsy input of `false` and `0` as they should change the gamepass to offsale; price updating will be skipped if undefined.
    if (typeof (args.price) === 'boolean' || typeof (args.price) === 'number') {
      return configureRobux(args, token)
    } else {
      return configureGamePass(args.gamePassId, args.name, args.description, undefined, args.icon, jar, token)
    }
  })
};

var getDeveloperProducts$1 = {};

// Includes
const http$J = http$1_.func;

// Args
getDeveloperProducts$1.required = ['placeId'];
getDeveloperProducts$1.optional = ['page', 'jar'];

// Docs
/**
 * 🔐 Returns the existing developer products in a specified game.
 * @category Game
 * @alias getDeveloperProducts
 * @param {number} placeId - The ID of the place whose developer products you want to retrieve
 * @param {number} [page=1] - Which page of developer products to return (pageSize is 50)
 * @returns {Promise<DeveloperProductsResult>}
 */

function getDeveloperProducts (jar, placeId, page) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//api.roblox.com/developerproducts/list?placeid=${placeId}&page=${page}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$J(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body));
        } else {
          const body = res.body || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} An error has occurred ${res.body ? res.body : ''}`));
          }
        }
      })
      .catch(error => reject(error))
  })
}

// Define
getDeveloperProducts$1.func = function (args) {
  return getDeveloperProducts(args.jar, args.placeId, args.page || 1)
};

var getGameInstances = {};

// Includes
const getPageResults$a = getPageResults$f.func;

// Args
getGameInstances.required = ['placeId'];
getGameInstances.optional = ['serverType', 'sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔓 Get the servers in a game.
 * @category Game
 * @alias getGameInstances
 * @param {number} placeId - The id of the place.
 * @param {("Public" | "Friend" | "VIP")=} [serverType=Public] - The type of server to get
 * @param {SortOrder=} [sortOrder=Asc] - The order that the servers will be sorted by (Asc or Desc)
 * @param {number=} [limit=∞] - The maximum number of results.
 * @returns {Promise<GameInstance[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const servers = await noblox.getGameInstances(1)
**/

// Define
getGameInstances.func = function (args) {
  return getPageResults$a({
    jar: args.jar,
    url: `//games.roblox.com/v1/games/${args.placeId}/servers/${args.serverType || 'Public'}`,
    sortOrder: args.sortOrder,
    limit: args.limit
  })
};

var getGamePasses$1 = {};

// Includes
const getPageResults$9 = getPageResults$f.func;

// Args
getGamePasses$1.required = ['universeId'];
getGamePasses$1.optional = ['limit'];

// Docs
/**
 * ✅ Gets a game's game passes.
 * @category Game
 * @alias getGamePasses
 * @param {number} universeId - The id of the universe.
 * @param {Limit=} limit - The max number of game passes to return.
 * @returns {Promise<GamePassData[]>}
 * @example const noblox = require("noblox.js")
 * const gamePasses = await noblox.getGamePasses(1686885941)
**/

// Define
const getGamePasses = async (universeId, limit) => {
  return getPageResults$9({
    url: `//games.roblox.com/v1/games/${universeId}/game-passes`,
    limit
  }).catch(err => {
    if (err.message === '404 The requested universe does not exist.') {
      err.message += '\n\nYou are possibly providing a placeId instead of a universeId.\nUse getPlaceInfo() to retrieve the universeId: https://noblox.js.org/global.html#getPlaceInfo\n';
      throw err
    }
    throw err
  })
};

getGamePasses$1.func = function ({ universeId, limit }) {
  if (isNaN(universeId)) {
    throw new Error('The provided universe ID is not a number.')
  }
  return getGamePasses(universeId, limit)
};

var getGameRevenue$1 = {};

const http$I = http$1_.func;
const getGeneralToken$e = getGeneralToken$P.func;

getGameRevenue$1.required = ['placeId', 'type', 'granularity'];
getGameRevenue$1.optional = ['jar'];

/**
 * 🔐 Get the Game Revenue data.
 * @category Game
 * @alias getGameRevenue
 * @param {number} placeId - The id of the game.
 * @param {"Revenue" | "RevenuePerVisit" | "AverageVisitLength" | "Visits"} type - The type of revenue. Options: Revenue, RevenuePerVisit, AverageVisitLength, Visits
 * @param {"Hourly" | "Daily" | "Monthly"} granularity - The type of revenue. Options: Hourly, Daily, Monthly
 * @returns {Promise<GameRevenueResponse>}
 * @example const noblox = require("noblox.js")
 * const gameRevenue = await noblox.getGameRevenue(936068308, "Revenue", "Hourly");
**/

function getGameRevenue (placeId, type, granularity, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//develop.roblox.com/v1/places/${placeId}/stats/${type}?granularity=${granularity}`,
      options: {
        method: 'GET',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$I(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) resolve(JSON.parse(res.body));
        else if (res.statusCode === 401) reject(new Error('You are not logged in.'));
        else if (res.statusCode === 403) reject(new Error('You do not have permission to view this game.'));
        else reject(new Error('An unknown error occurred.'));
      })
      .catch(function (err) { console.error(err); reject(err); })
  })
}

getGameRevenue$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$e({ jar })
    .then(function (xcsrf) {
      return getGameRevenue(args.placeId, args.type, args.granularity, jar, xcsrf)
    })
};

var getGameSocialLinks$1 = {};

// Includes
const http$H = http$1_.func;

// Args
getGameSocialLinks$1.required = ['universeId'];
getGameSocialLinks$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get the social link data associated with a game.
 * @category Game
 * @alias getGameSocialLinks
 * @param {number} universeId - The universe id of the game.
 * @returns {Promise<SocialLinkResponse[]>}
 * @see [getPlaceInfo()](global.html#getPlaceInfo) - can be used to convert a placeId to a universeId
 * @example const noblox = require("noblox.js")
 * const gameSocialLinks = await noblox.getGameSocialLinks(2615802125)
**/

// Define
function getGameSocialLinks (universeId, jar) {
  return http$H({
    url: `//games.roblox.com/v1/games/${universeId}/social-links/list`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors, data } = JSON.parse(body);
      if (statusCode === 200 && data) {
        return data
      } else if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
        throw new Error(`${errors[0].message} | universeId: ${universeId}`)
      } else if (statusCode === 401) {
        throw new Error(`${errors[0].message} (Are you logged in?) | universeId: ${universeId}`)
      } else {
        throw new Error(`An unknown error occurred with getGameSocialLinks() | [${statusCode}] universeId: ${universeId}`)
      }
    })
}

getGameSocialLinks$1.func = function ({ universeId, jar }) {
  return getGameSocialLinks(universeId, jar)
};

var getGroupGames = {};

// Includes
const getPageResults$8 = getPageResults$f.func;

// Args
getGroupGames.required = ['groupId'];
getGroupGames.optional = ['accessFilter', 'sortOrder', 'limit'];

// Docs
/**
 * ✅ Get a group's games.
 * @category Group
 * @alias getGroupGames
 * @param {number} groupId - The id of the group.
 * @param {("All" | "Public" | "Private")=} [accessFilter=All] - Filtering games via access level.
 * @param {SortOrder=} [sortOrder=Asc] - The order results are sorted in.
 * @param {Limit=} [limit=∞] - The maximum number of games to return
 * @returns {Promise<GroupGameInfo[]>}
 * @example const noblox = require("noblox.js")
 * const groupGames = await noblox.getGroupGames({groupId: 1, accessFilter: 'All', sortOrder: 'Asc', limit: '100'})
**/

// Define
getGroupGames.func = function (args) {
  return getPageResults$8({
    url: `//games.roblox.com/v2/groups/${args.groupId}/games`,
    query: { accessFilter: args.accessFilter || 'All' },
    sortOrder: args.sortOrder || 'Asc',
    limit: args.limit
  })
};

var getPlaceInfo$1 = {};

// Includes
const http$G = http$1_.func;

// Args
getPlaceInfo$1.required = ['placeId'];
getPlaceInfo$1.optional = ['jar'];

// Docs
/**
 * 🔓 Get the info for a universe.
 * @category Game
 * @alias getPlaceInfo
 * @param {number | Array<number>} universeId - The id(s) of the place(s).
 * @returns {Promise<PlaceInformation[]>}
 * @example const noblox = require("noblox.js")
 * const universeInfo = await noblox.getPlaceInfo([ 10905034443 ])
**/

function getPlaceInfo (placeIds, jar) {
  return new Promise((resolve, reject) => {
    if (typeof (placeIds) === 'number') placeIds = [placeIds];

    const httpOpt = {
      url: `//games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIds.join(',')}`,
      options: {
        json: true,
        resolveWithFullResponse: true,
        jar,
        method: 'GET'
      }
    };

    return http$G(httpOpt)
      .then(function ({ statusCode, body }) {
        if (statusCode === 200) {
          resolve(body);
        } else if (body && body.errors) {
          reject(new Error(`[${statusCode}] ${body.errors[0].message} | placeIds: ${placeIds.join(',')} ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`));
        } else {
          reject(new Error(`An unknown error occurred with getPlaceInfo() | [${statusCode}] placeIds: ${placeIds.join(',')}`));
        }
      }).catch(reject)
  })
}

getPlaceInfo$1.func = function (args) {
  return getPlaceInfo(args.placeId, args.jar)
};

var getUniverseInfo$1 = {};

const http$F = http$1_.func;

getUniverseInfo$1.required = ['universeId'];
getUniverseInfo$1.optional = ['jar'];

// Docs
/**
 * 🔓 Get the info for a universe.
 * @category Game
 * @alias getUniverseInfo
 * @param {number | Array<number>} universeId - The id(s) of the universe(s).
 * @returns {Promise<UniverseInformation[]>}
 * @example const noblox = require("noblox.js")
 * const universeInfo = await noblox.getUniverseInfo([ 2152417643 ])
**/

function getUniverseInfo (universeIds, jar) {
  return new Promise((resolve, reject) => {
    if (typeof (universeIds) === 'number') universeIds = [universeIds];

    const httpOpt = {
      url: `//games.roblox.com/v1/games?universeIds=${universeIds.join(',')}`,
      options: {
        json: true,
        resolveWithFullResponse: true,
        jar,
        method: 'GET'
      }
    };

    return http$F(httpOpt)
      .then(function ({ statusCode, body }) {
        if (statusCode === 200) {
          resolve(body.data.map((universe) => {
            universe.created = new Date(universe.created);
            universe.updated = new Date(universe.updated);

            return universe
          }));
        } else if (body && body.errors) {
          reject(new Error(`[${statusCode}] ${body.errors[0].message} | universeIds: ${universeIds.join(',')} ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`));
        } else {
          reject(new Error(`An unknown error occurred with getUniverseInfo() | [${statusCode}] universeIds: ${universeIds.join(',')}`));
        }
      }).catch(reject)
  })
}

getUniverseInfo$1.func = function (args) {
  return getUniverseInfo(args.universeId, args.jar)
};

var publishToTopic$1 = {};

const http$E = http$1_.func;

publishToTopic$1.required = ['universeId', 'topic', 'data'];
publishToTopic$1.optional = ['jar'];

// Docs
/**
 * ☁️ Publish a message to a subscribed topic.
 * @category Game
 * @alias publishToTopic
 * @param {number} universeId - The id of the universe.
 * @param {string} topic - The name of the topic.
 * @param {Object | string} data - The data to post.
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * const data = { targetUser: 123456789, staffMember: 1210019099, action: "Kick" }
 *
 * await noblox.publishToTopic(2152417643, "ModerateUser", data)
**/

function publishToTopic (universeId, topic, data, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//apis.roblox.com/messaging-service/v1/universes/${universeId}/topics/${topic}`,
      options: {
        json: true,
        resolveWithFullResponse: true,
        jar,
        method: 'POST',
        body: { message: JSON.stringify(data) },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return http$E(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          if (typeof (res.body) === 'string') {
            reject(new Error(`[${res.statusCode}] ${res.statusMessage} ${res.body}`));
          } else {
            const data = Object.assign(res.body);
            reject(new Error(`[${res.statusCode}] ${data.Error} ${data.Message}`));
          }
        }
      })
      .catch(reject)
  })
}

publishToTopic$1.func = function (args) {
  return publishToTopic(args.universeId, args.topic, args.data, args.jar)
};

var updateDeveloperProduct$1 = {};

const http$D = http$1_.func;
const getGeneralToken$d = getGeneralToken$P.func;

updateDeveloperProduct$1.required = ['universeId', 'productId', 'priceInRobux'];
updateDeveloperProduct$1.optional = ['name', 'description', 'jar'];

// Docs
/**
 * 🔐 Update a developer product.
 * @category Game
 * @alias updateDeveloperProduct
 * @param {number} universeId - The id of the universe.
 * @param {number} productId - The id of the product.
 * @param {number} priceInRobux - The new price of the product.
 * @param {string=} name - The new name of the product.
 * @param {string=} description - The new description of the product.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.updateDeveloperProduct(1, 2, 10, "An Updated Developer Product", "My new updated product.")
**/

function updateDeveloperProduct (universeId, productId, priceInRobux, name, description, jar, token) {
  return new Promise((resolve, reject) => {
    return http$D({
      url: `//apis.roblox.com/developer-products/v1/universes/${universeId}/developerproducts/${productId}/update`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          Name: name,
          Description: description,
          PriceInRobux: priceInRobux
        },
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve(body);
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message} | universeId: ${universeId}, body: ${JSON.stringify({
          Name: name,
          Description: description,
          PriceInRobux: priceInRobux
        })}`));
      } else {
        reject(new Error(`An unknown error occurred with updateDeveloperProduct() | [${statusCode}] universeId: ${universeId}, body: ${JSON.stringify({
          Name: name,
          Description: description,
          PriceInRobux: priceInRobux
        })}`));
      }
    }).catch(reject)
  })
}

updateDeveloperProduct$1.func = function ({ universeId, productId, priceInRobux, name, description, jar }) {
  return getGeneralToken$d({ jar })
    .then((token) => {
      return updateDeveloperProduct(universeId, productId, priceInRobux, name, description, jar, token)
    })
};

var changeRank$2 = {};

var setRank$2 = {};

var getRole$3 = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(entities$1);

var getRoles$3 = {};

// Includes
const http$C = http$1_.func;
const cache$5 = cache$a;

// Args
getRoles$3.required = ['group'];

// Docs
/**
 * ✅ Get the roles in a group.
 * @category Group
 * @alias getRoles
 * @param {number} group - The id of the group.
 * @returns {Promise<Role[]>}
 * @example const noblox = require("noblox.js")
 * const roles = await noblox.getRoles(1)
**/

// Define
function getRoles$2 (group) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/roles`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true
      }
    };
    return http$C(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          let roles = responseData.roles;
          roles = roles.sort((a, b) => a.rank - b.rank);
          for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            role.ID = role.id;
          }
          resolve(roles);
        }
      }).catch(error => reject(error))
  })
}

getRoles$3.func = function (args) {
  const group = args.group;
  return cache$5.wrap('Roles', group, function () {
    return getRoles$2(group)
  })
};

// Dependencies
const entities = require$$0;

// Includes
const getRoles$1 = getRoles$3.func;

// Args
getRole$3.required = ['group', 'roleQuery'];
getRole$3.optional = [];

// Docs
/**
 * ✅ Get a role in a group.
 * @category Group
 * @alias getRole
 * @param {number | Array<number>} group - The ID of the group or an array of roles to query.
 * @param {number | string} roleQuery - The rank of a role, the name of the role, or roleset ID.
 * @returns {Promise<Role>}
 * @example const noblox = require("noblox.js")
 * const customerRole = await noblox.getRole(1, "Customer")
**/

// Define
function getRole$2 (roles, roleQuery) {
  return new Promise((resolve, reject) => {
    const result = [];

    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      let find;
      if (typeof roleQuery === 'number' && roleQuery <= 255) {
        find = role.rank;
      } else if (typeof roleQuery === 'string') {
        find = entities.decodeHTML(role.name);
      } else if (typeof roleQuery === 'number' || roleQuery > 255) {
        find = role.id;
      }

      if (roleQuery === find) {
        result.push(role);
      }
    }

    if (result.length === 1) {
      resolve(result[0]);
    } else if (result.length > 1) {
      reject(new Error(`There are two or more roles with the rank ${roleQuery}. You must specify the role name.`));
    } else {
      reject(new Error('Role not found with provided query.'));
    }
  })
}

getRole$3.func = function (args) {
  if (typeof args.group === 'number' || typeof args.group === 'string') {
    return getRoles$1({ group: parseInt(args.group, 10) }).then(function (roles) {
      return getRole$2(roles, args.roleQuery)
    })
  } else if (typeof args.group === 'object') {
    return getRole$2(args.group, args.roleQuery)
  } else {
    throw new Error('Please provide a valid group or an array of roles to query.')
  }
};

// Includes
const http$B = http$1_.func;
const getGeneralToken$c = getGeneralToken$P.func;
const getRole$1 = getRole$3.func;

// Args
setRank$2.required = ['group', 'target', 'rank'];
setRank$2.optional = ['jar'];

// Docs
/**
 * 🔐 Change a user's rank.
 * @category Group
 * @alias setRank
 * @param {number} group - The id of the group.
 * @param {number} target - The id of the user whose rank is being changed.
 * @param {number | string | Role} rank - The rank, roleset ID, name of the role, or the actual Role itself.
 * @returns {Promise<Role>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setRank(1, 1, "Customer")
**/

// Define
function setRank$1 (jar, xcsrf, group, target, role) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/users/${target}`,
      options: {
        resolveWithFullResponse: true,
        method: 'PATCH',
        jar,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': xcsrf
        },
        body: JSON.stringify({
          roleId: role.id
        })
      }
    };
    return http$B(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(role);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

function runWithToken$1 (args) {
  const jar = args.jar;
  return getGeneralToken$c({ jar })
    .then(function (xcsrf) {
      return setRank$1(jar, xcsrf, args.group, args.target, args.role)
    })
}

setRank$2.func = function (args) {
  if (typeof args.rank === 'object') { // assumes they gave Role
    args.role = args.rank;
    return runWithToken$1(args)
  } else if (typeof args.rank === 'number' || typeof args.rank === 'string') {
    return getRole$1({ group: args.group, roleQuery: args.rank }).then((role) => {
      args.role = role;
      return runWithToken$1(args)
    })
  } else {
    throw new Error('Please provide either a Role, rank, or role name to change the user\'s rank to')
  }
};

var getRankNameInGroup$2 = {};

// Includes
const http$A = http$1_.func;
const cache$4 = cache$a;

// Args
getRankNameInGroup$2.required = ['group', 'userId'];

// Docs
/**
 * ✅ Get a user's rank name in a group.
 * @category Group
 * @alias getRankNameInGroup
 * @param {number} group - The id of the group.
 * @param {number} userId - The id of the user.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * const rankName = await noblox.getRankNameInGroup(1, 1)
**/

// Define
function getRankNameInGroup$1 (group, userId) {
  if (typeof group === 'string') {
    if (!isNaN(group)) {
      // It's a number in a string
      group = parseInt(group, 10);
    } else {
      throw new Error('Group id should be a number')
    }
  }
  return http$A({ url: `//groups.roblox.com/v2/users/${userId}/groups/roles`, options: { json: true } }).then((body) => {
    const error = body.errors && body.errors[0];

    if (error) {
      if (error.message === 'NotFound') {
        throw new Error('An invalid UserID or GroupID was provided.')
      } else {
        throw new Error(error.message)
      }
    }

    const groupObject = body.data.find((info) => group === info.group.id);

    return groupObject ? groupObject.role.name : 'Guest'
  })
}

getRankNameInGroup$2.func = function (args) {
  const id = args.userId;
  return cache$4.wrap('Rank', id + 'Name', function () {
    return getRankNameInGroup$1(args.group, id)
  })
};

// Includes
const setRank = setRank$2.func;
const getRoles = getRoles$3.func;
const getRankNameInGroup = getRankNameInGroup$2.func;

// Args
changeRank$2.required = ['group', 'target', 'change'];
changeRank$2.optional = ['jar'];

// Docs
/**
 * 🔐 Change a user's rank.
 * @category Group
 * @alias changeRank
 * @param {number} groupId - The id of the group.
 * @param {number} target - The userId of the target.
 * @param {number} change - The change in rank (1 = one rank higher, -1 = one rank lower)
 * @returns {Promise<ChangeRankResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.changeRank(1, 2, -1)
**/

// Define
changeRank$2.func = function (args) {
  const group = args.group;
  const target = args.target;
  const amount = args.change;
  const jar = args.jar;
  return getRankNameInGroup({ group, userId: target })
    .then(function (rank) {
      if (rank === 'Guest') {
        throw new Error('Target user is not in group')
      }
      return getRoles({ group })
        .then(function (roles) {
          for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            const thisRank = role.name;

            if (thisRank === rank) {
              const change = i + amount;
              const found = roles[change];

              if (!found) {
                throw new Error('Rank change is out of range')
              } else if (found.name === 'Guest' || found.rank === 0) {
                throw new Error('Group members cannot be demoted to guest.')
              }

              return setRank({ group, target, rank: found.id, jar })
                .then(function () {
                  return { newRole: found, oldRole: role }
                })
            }
          }
        })
    })
};

var deleteWallPost$1 = {};

// Includes
const http$z = http$1_.func;
const getGeneralToken$b = getGeneralToken$P.func;

// Args
deleteWallPost$1.required = ['group', ['postId', 'post']];
deleteWallPost$1.optional = ['jar'];

// Docs
/**
 * 🔐 Delete a wall post.
 * @category Group
 * @alias deleteWallPost
 * @param {number} group - The id of the group.
 * @param {number} postId - The id of the post to delete.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.deleteWallPost(1, 2)
**/

// Define
function deleteWallPost (jar, token, group, postId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/wall/posts/${postId}`,
      options: {
        method: 'DELETE',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    };
    return http$z(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

deleteWallPost$1.func = function (args) {
  const group = args.group;
  const jar = args.jar;
  return getGeneralToken$b({ jar })
    .then(function (xcsrf) {
      if (args.post) {
        return deleteWallPost(jar, xcsrf, group, args.post.id)
      } else {
        return deleteWallPost(jar, xcsrf, group, args.postId)
      }
    })
};

var deleteWallPostsByUser$1 = {};

// Includes
const http$y = http$1_.func;
const getGeneralToken$a = getGeneralToken$P.func;

// Args
deleteWallPostsByUser$1.required = ['group', 'userId'];
deleteWallPostsByUser$1.optional = ['jar'];

// Docs
/**
 * 🔐 Removes all wall posts sent by the provided user.
 * @category Group
 * @alias deleteWallPostsByUser
 * @param {number} group - The id of the group.
 * @param {number} userId - The userId of the user having their posts removed.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.deleteWallPostsByUser(1, 2)
 **/

function deleteWallPostsByUser (group, userId, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/wall/users/${userId}/posts`,
      options: {
        method: 'DELETE',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$y(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve();
        }
      }).catch(error => reject(error))
  })
}

// Define
deleteWallPostsByUser$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$a({ jar })
    .then(function (xcsrf) {
      return deleteWallPostsByUser(args.group, args.userId, args.jar, xcsrf)
    })
};

var demote = {};

// Includes
const changeRank$1 = changeRank$2.func;

// Args
demote.required = ['group', 'target'];
demote.optional = ['jar'];

// Docs
/**
 * 🔐 Demote a user.
 * @category Group
 * @alias demote
 * @param {number} group - The id of the group.
 * @param {number} target - The userId of the user being demoted.
 * @returns {Promise<ChangeRankResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.demote(1, 2)
**/

// Define
demote.func = function (args) {
  args.change = -1;
  return changeRank$1(args)
};

var exile = {};

// Includes
const http$x = http$1_.func;
const getGeneralToken$9 = getGeneralToken$P.func;

// Args
exile.required = ['group', 'target'];
exile.optional = ['jar'];

// Docs
/**
 * 🔐 Exile a user from a group.
 * @category Group
 * @alias exile
 * @param {number} group - The id of the group.
 * @param {number} target - The userId of the user being exiled.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.exile(1, 2)
**/

function exileUser (group, target, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/users/${target}`,
      options: {
        method: 'DELETE',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$x(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve();
        }
      }).catch(error => reject(error))
  })
}

// Define
exile.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$9({ jar })
    .then(function (xcsrf) {
      return exileUser(args.group, args.target, args.jar, xcsrf)
    })
};

var getAuditLog$2 = {};

// Includes
const http$w = http$1_.func;

getAuditLog$2.required = ['group'];
getAuditLog$2.optional = ['actionType', 'userId', 'sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * 🔐 Get the audit log for the group.
 * @category Group
 * @alias getAuditLog
 * @param {number} group - The id of the group.
 * @param {("DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelClanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace")=} actionType - The action type to filter for.
 * @param {number=} userId - The user's id to filter for.
 * @param {SortOrder=} sortOrder - The order to sort the logs by.
 * @param {Limit=} limit - The maximum logs per a page.
 * @param {string=} cursor - The cursor for the page.
 * @returns {Promise<AuditPage>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const rankLogs = await noblox.getAuditLog(1, "ChangeRank", 2, "Asc")
**/

function getAuditLog$1 (group, actionType, userId, sortOrder, limit, cursor, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/audit-log?actionType=${actionType}&cursor=${cursor}&limit=${limit}&sortOrder=${sortOrder}&userId=${userId}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    };

    return http$w(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          responseData.data = responseData.data.map((entry) => {
            // We need to set milliseconds to 0 because Roblox does this fascinating thing
            // Where they vary the ms value on each request, for an existing action.
            entry.created = new Date(entry.created);
            entry.created.setMilliseconds(0);
            return entry
          });
          resolve(responseData);
        }
      }).catch(error => reject(error))
  })
}

// Define
getAuditLog$2.func = function (args) {
  const jar = args.jar;
  const actionType = args.actionType || '';
  const userId = args.userId || '';
  const sortOrder = args.sortOrder || 'Asc';
  const limit = args.limit || (100).toString();
  const cursor = args.cursor || '';
  return getAuditLog$1(args.group, actionType, userId, sortOrder, limit, cursor, jar)
};

var getGroup$1 = {};

// Includes
const http$v = http$1_.func;

// Args
getGroup$1.required = ['groupId'];
getGroup$1.optional = [];

// Docs
/**
 * ✅ Get a group's info.
 * @category Group
 * @alias getGroup
 * @param {number} groupId - The id of the group.
 * @returns {Promise<Group>}
 * @example const noblox = require("noblox.js")
 * const groupInfo = await noblox.getGroup(1)
**/

// Define
function getGroup (groupId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${groupId}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true
      }
    };
    return http$v(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const body = JSON.parse(res.body);

          if (body.shout) {
            body.shout.created = new Date(body.shout.created);
            body.shout.updated = new Date(body.shout.updated);
          }

          resolve(body);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      }).catch(error => reject(error))
  })
}

getGroup$1.func = function (args) {
  return getGroup(args.groupId)
};

var getGroupSocialLinks$1 = {};

// Includes
const http$u = http$1_.func;

// Args
getGroupSocialLinks$1.required = ['groupId'];
getGroupSocialLinks$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get the social link data associated with a group.
 * @category Group
 * @alias getGroupSocialLinks
 * @param {number} groupId - The id of the group.
 * @returns {Promise<SocialLinkResponse[]>}
 * @example const noblox = require("noblox.js")
 * const groupSocialLinks = await noblox.getGroupSocialLinks(9997719)
**/

// Define
function getGroupSocialLinks (groupId, jar) {
  return http$u({
    url: `//groups.roblox.com/v1/groups/${groupId}/social-links`,
    options: {
      jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors, data } = JSON.parse(body);
      if (statusCode === 200 && data) {
        return data
      } else if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
        throw new Error(`${errors[0].message} | groupId: ${groupId}`)
      } else if (statusCode === 401) {
        throw new Error(`${errors[0].message} (Are you logged in?) | groupId: ${groupId}`)
      } else {
        throw new Error(`An unknown error occurred with getGroupSocialLinks() | [${statusCode}] groupId: ${groupId}`)
      }
    })
}

getGroupSocialLinks$1.func = function ({ groupId, jar }) {
  return getGroupSocialLinks(groupId, jar)
};

var getGroups$1 = {};

// Includes
const http$t = http$1_.func;

// Args
getGroups$1.required = ['userId'];
getGroups$1.optional = [];

// Docs
/**
 * ✅ Get the groups of a user.
 * @category User
 * @alias getGroups
 * @param {number} userId - The id of the user.
 * @returns {Promise<IGroupPartial[]>}
 * @example const noblox = require("noblox.js")
 * let groups = await noblox.getGroups(123456)
**/

// Define
function getGroups (userId) {
  return new Promise((resolve, reject) => {
    const requests = [
      constructRequest(`//groups.roblox.com/v2/users/${userId}/groups/roles`),
      constructRequest(`//groups.roblox.com/v1/users/${userId}/groups/primary/role`)
    ].map(promise => promise.then(
      val => ({ status: 'fulfilled', value: val }),
      rej => ({ status: 'rejected', reason: rej })
    ));

    const result = [];

    Promise.all(requests).then(async (promiseResponses) => {
      let responses = promiseResponses.map(response => response.value);
      const failedResponse = (responses[0].statusCode !== 200 || !responses[0].body); // we only check the first request because the second one errors if a primary is not set

      if (failedResponse) {
        const body = responses[0].body || {};
        if (body.errors && body.errors.length > 0) {
          const errors = body.errors.map((e) => {
            return e.message
          });
          reject(new Error(`${responses[0].statusCode} ${errors.join(', ')}`));
        }
        reject(new Error('The provided user ID is not valid.'));
      }

      responses = responses.map(r => r.body);

      const groupRoleData = responses[0].data;
      if (groupRoleData) {
        const primaryGroupId = responses[1] && responses[1].group && responses[1].group.id;

        const groupThumbails = await constructRequest(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupRoleData.map(data => data.group.id).join(',')}&size=150x150&format=Png&isCircular=false`);

        groupRoleData.forEach(data => {
          const insertion = {
            Id: data.group.id,
            Name: data.group.name,
            MemberCount: data.group.memberCount,
            IsPrimary: data.group.id === primaryGroupId,
            Rank: data.role.rank,
            Role: data.role.name,
            RoleId: data.role.id,
            EmblemUrl: groupThumbails.body.data.find(thumbnail => thumbnail.targetId === data.group.id).imageUrl
          };
          result.push(insertion);
        });
      }

      resolve(result);
    });
  })
}

function constructRequest (url) {
  return http$t({
    url,
    options: {
      resolveWithFullResponse: true,
      followRedirect: false,
      json: true
    }
  })
}

getGroups$1.func = function (args) {
  return getGroups(args.userId)
};

var getJoinRequest$1 = {};

// Includes
const http$s = http$1_.func;

// Args
getJoinRequest$1.required = ['group', 'userId'];
getJoinRequest$1.optional = ['jar'];

// Docs
/**
 * 🔐 Gets a specific join request, given a user ID.
 * @category Group
 * @alias getJoinRequest
 * @param {number} group - The id of the group.
 * @param {number} userId - The user ID whose join request is wanted.
 * @returns {(Promise<GroupJoinRequest>|Promise<null>)} A join request if one exists, or null.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const request = await noblox.getJoinRequest(4591072, 5903228)
**/

// Define
function getJoinRequest (jar, group, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/join-requests/users/${userId}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$s(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body) || null);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

getJoinRequest$1.func = function (args) {
  const jar = args.jar;
  return getJoinRequest(jar, args.group, args.userId)
};

var getJoinRequests$3 = {};

// Includes
const http$r = http$1_.func;

// Args
getJoinRequests$3.required = ['group'];
getJoinRequests$3.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * 🔐 Get the join requests for a group.
 * @category Group
 * @alias getJoinRequests
 * @param {number} group - The id of the group.
 * @param {SortOrder=} sortOrder - The order to sort the requests by.
 * @param {Limit=} limit - The maximum results per a page.
 * @param {string=} cursor - The cursor for the next page.
 * @returns {Promise<GroupJoinRequestsPage>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const requests = await noblox.getJoinRequests(1, "Asc")
**/

// Define
function getJoinRequests$2 (jar, group, sortOrder, limit, cursor) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/join-requests?limit=${limit}&sortOrder=${sortOrder}&cursor=${cursor}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$r(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body));
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
      .catch(error => reject(error))
  })
}

getJoinRequests$3.func = function (args) {
  const jar = args.jar;
  const sortOrder = args.sortOrder || 'Asc';
  const limit = args.limit || (10).toString();
  const cursor = args.cursor || '';
  return getJoinRequests$2(jar, args.group, sortOrder, limit, cursor)
};

var getPlayers = {};

// Includes
const http$q = http$1_.func;

// Args
getPlayers.required = ['group', ['rolesetId']];
getPlayers.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * ✅ Get the players in a group for a specific role.
 * @category Group
 * @alias getPlayers
 * @param {number} group - The id of the group.
 * @param {number | Array<number>} rolesetId - The roleset's id.
 * @param {SortOrder=} sortOrder - The order to get the players in.
 * @param {Limit=} limit - The maximum result per a page.
 * @param {string=} cursor - The cursor for the next page.
 * @returns {Promise<GroupUser[]>}
 * @example const noblox = require("noblox.js")
 * const players = await noblox.getPlayers(1, 1117747196)
**/

// Define
function getPlayersInRoleOnPage (jar, group, rolesetId, sortOrder, limit, cursor) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/roles/${rolesetId}/users?cursor=${cursor}&limit=${limit}&sortOrder=${sortOrder}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$q(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body));
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

function getPlayersInRole (jar, group, rolesetId, sortOrder, limit, cursor, currentPlayers) {
  return new Promise((resolve, reject) => {
    if (!currentPlayers) currentPlayers = [];

    getPlayersInRoleOnPage(jar, group, rolesetId, sortOrder, 100, cursor)
      .then(function (pageData) {
        const nextPageCursor = pageData.nextPageCursor;
        const dataArray = pageData.data;

        if (!dataArray) return reject(new Error('Error while retrieving players!'))

        currentPlayers = currentPlayers.concat(dataArray);

        if (limit > 0 && currentPlayers.length >= limit) {
          return resolve(currentPlayers.slice(0, limit))
        } else if (nextPageCursor === null) {
          return resolve(currentPlayers)
        }

        getPlayersInRole(jar, group, rolesetId, sortOrder, limit, nextPageCursor, currentPlayers)
          .then(function (newCurrentPlayers) {
            return resolve(newCurrentPlayers)
          });
      }).catch(error => reject(error));
  })
}

async function getPlayersInRoles (jar, group, rolesetIds, sortOrder, limit, cursor) {
  let currentPlayers = [];

  for (let i = 0; i < rolesetIds.length; i++) {
    const rolesetId = rolesetIds[i];
    const roleLimit = limit <= 0 ? limit : limit - currentPlayers.length;

    await getPlayersInRole(jar, group, rolesetId, sortOrder, roleLimit, cursor)
      .then((newData) => {
        currentPlayers = currentPlayers.concat(newData);
      })
      .catch((error) => {
        throw new Error(error)
      });

    if (limit > 0 && currentPlayers.length >= limit) {
      return currentPlayers
    }
  }

  return currentPlayers
}

getPlayers.func = function (args) {
  const jar = args.jar;
  const rolesetIds = Array.isArray(args.rolesetId) ? args.rolesetId : [args.rolesetId];
  const sortOrder = args.sortOrder || 'Desc';
  const limit = args.limit || -1;
  const cursor = args.cursor || '';
  return getPlayersInRoles(jar, args.group, rolesetIds, sortOrder, limit, cursor)
};

var getRankInGroup$1 = {};

// Includes
const http$p = http$1_.func;
const cache$3 = cache$a;

// Args
getRankInGroup$1.required = ['group', 'userId'];

// Docs
/**
 * ✅ Get the user's rank in the group.
 * @category Group
 * @alias getRankInGroup
 * @param {number} group - The id of the group.
 * @param {number} userId - The id of the user.
 * @returns {Promise<number>}
 * @example const noblox = require("noblox.js")
 * const rankId = await noblox.getRankInGroup(1, 1)
**/

// Define
function getRankInGroup (groupId, userId) {
  if (typeof groupId === 'string') {
    if (!isNaN(groupId)) {
      // It's a number in a string
      groupId = parseInt(groupId, 10);
    } else {
      throw new Error('Group id should be a number')
    }
  }
  return http$p({ url: `//groups.roblox.com/v2/users/${userId}/groups/roles`, options: { json: true } }).then((body) => {
    const error = body.errors && body.errors[0];

    if (error) {
      if (error.message === 'NotFound') {
        throw new Error('An invalid UserID or GroupID was provided.')
      } else {
        throw new Error(error.message)
      }
    }

    const groupObject = body.data.find((info) => groupId === info.group.id);

    return groupObject ? parseInt(groupObject.role.rank) : 0
  })
}

getRankInGroup$1.func = function (args) {
  const id = args.userId;
  return cache$3.wrap('Rank', id, function () {
    return getRankInGroup(args.group, id)
  })
};

var getRolePermissions$1 = {};

// Includes
const http$o = http$1_.func;

getRolePermissions$1.required = ['group', 'rolesetId'];
getRolePermissions$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get the permissions for a role.
 * @category Group
 * @alias getRolePermissions
 * @param {number} group - The id of the group.
 * @param {number} rolesetId - The rolesetId of the role.
 * @returns {Promise<RolePermissions>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const rolePermissions = await noblox.getRolePermissions(1, 1117747196)
**/

function getRolePermissions (group, rolesetId, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/roles/${rolesetId}/permissions`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    };

    return http$o(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve(responseData);
        }
      }).catch(error => reject(error))
  })
}

// Define
getRolePermissions$1.func = function (args) {
  const jar = args.jar;
  return getRolePermissions(args.group, args.rolesetId, jar)
};

var getShout$2 = {};

// Includes
const http$n = http$1_.func;

// Args
getShout$2.required = ['group'];
getShout$2.optional = [];

// Docs
/**
 * 🔓 Get the group's shout.
 * @category Group
 * @alias getShout
 * @param {number} group - The id of the group.
 * @returns {Promise<GroupShout>}
 * @example const noblox = require("noblox.js")
 * const groupShout = await noblox.getShout(1)
**/

// Define
function getShout$1 (group, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    };

    return http$n(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode === 400) {
          reject(new Error('The group is invalid or does not exist.'));
        }
        if (responseData.shout === null) {
          reject(new Error('You do not have permissions to view the shout for the group.'));
        } else {
          resolve(responseData.shout);
        }
      })
      .catch(error => reject(error))
  })
}

getShout$2.func = function (args) {
  return getShout$1(args.group, args.jar)
};

var getWall$1 = {};

const http$m = http$1_.func;

getWall$1.required = ['group'];
getWall$1.optional = ['sortOrder', 'limit', 'cursor', 'jar'];

// Docs
/**
 * 🔓 Get the posts on the group wall.
 * @category Group
 * @alias getWall
 * @param {number} group - The id of the group.
 * @param {SortOrder=} sortOrder - The order to get the players in.
 * @param {Limit=} limit - The maximum result per a page.
 * @param {string=} cursor - The cursor for the next page.
 * @returns {Promise<WallPostPage>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const wallPosts = await noblox.getWall(1)
**/

function getPosts (group, sortOrder, limit, cursor, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v2/groups/${group}/wall/posts?limit=${limit}&sortOrder=${sortOrder}&cursor=${cursor}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    };

    return http$m(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          responseData.data = responseData.data.map((entry) => {
            entry.created = new Date(entry.created);
            entry.updated = new Date(entry.updated);
            return entry
          });
          resolve(responseData);
        }
      }).catch(error => reject(error))
  })
}

// Define
getWall$1.func = function (args) {
  const sortOrder = args.sortOrder || 'Asc';
  const limit = args.limit || 100;
  const cursor = args.cursor || '';
  return getPosts(args.group, sortOrder, limit, cursor, args.jar)
};

var groupPayout$1 = {};

// Includes
const http$l = http$1_.func;
const getGeneralToken$8 = getGeneralToken$P.func;

// Args
groupPayout$1.required = ['group', 'member', 'amount'];
groupPayout$1.optional = ['recurring', 'usePercentage', 'jar'];

// Docs
/**
 * 🔐 Pay group funds out to a user.
 * @category Group
 * @alias groupPayout
 * @param {number} group - The id of the group.
 * @param {number | Array<number>} member - The member or array of members to payout.
 * @param {number} amount - The amount of Robux for each recipient to receive.
 * @param {boolean=} [recurring=false] - If the payment is recurring.
 * @param {boolean=} [usePercentage=false] - If the amount is a percentage.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.groupPayout(1117747196, 55549140, 30)
**/

// Define
function groupPayout (jar, token, group, data, recurring, usePercentage) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/payouts${recurring ? '/recurring' : ''}`,
      options: {
        resolveWithFullResponse: true,
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          PayoutType: (usePercentage ? 'Percentage' : 'FixedAmount'),
          Recipients: data
        })
      }
    };
    return http$l(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve();
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

// Although I would normally leave it to the endpoint to error when incorrect percentages are given, it's not very reliable so I'll do it instead
function isPercentage (num) {
  return num >= 0 && num <= 100 && num % 1 === 0
}

groupPayout$1.func = function (args) {
  const jar = args.jar;
  let member = args.member;
  let amount = args.amount;
  const recurring = args.recurring || false;
  const usePercentage = recurring ? true : args.usePercentage;
  const data = [];

  if (!(member instanceof Array)) {
    member = [member];
    amount = [amount];
  } else if (!(amount instanceof Array) || member.length !== amount.length) {
    throw new Error('If member is an array amount must be a parallel array')
  }
  let total = 0;
  for (let i = 0; i < member.length; i++) {
    const value = amount[i];
    if (usePercentage) {
      if (!isPercentage(value)) {
        throw new Error('Percent values must be whole numbers between 0 and 100 inclusive')
      }
      total += value;
      if (total > 100) {
        throw new Error('Sum of percent values must be less than 100')
      }
    }
    data.push({
      recipientId: member[i],
      recipientType: 'User',
      amount: value
    });
  }

  return getGeneralToken$8({ jar })
    .then(function (xcsrf) {
      return groupPayout(jar, xcsrf, args.group, data, recurring, usePercentage)
    })
};

var handleJoinRequest$2 = {};

// Includes
const http$k = http$1_.func;
const getGeneralToken$7 = getGeneralToken$P.func;

// Args
handleJoinRequest$2.required = ['group', 'userId', 'accept'];
handleJoinRequest$2.optional = ['jar'];

// Docs
/**
 * 🔐 Accept/decline a user's join request.
 * @category Group
 * @alias handleJoinRequest
 * @param {number} group - The id of the group.
 * @param {number} userId - The id of the user.
 * @param {boolean} accept - If the user should be accepted into the group.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.handleJoinRequest(1, 1, true)
**/

function handleJoinRequest$1 (group, userId, accept, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/join-requests/users/${userId}`,
      options: {
        method: accept ? 'POST' : 'DELETE',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$k(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve();
        }
      }).catch(error => reject(error))
  })
}

// Define
handleJoinRequest$2.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$7({ jar })
    .then(function (xcsrf) {
      return handleJoinRequest$1(args.group, args.userId, args.accept, args.jar, xcsrf)
    })
};

var leaveGroup = {};

var hasRequiredLeaveGroup;

function requireLeaveGroup () {
	if (hasRequiredLeaveGroup) return leaveGroup;
	hasRequiredLeaveGroup = 1;
	// Includes
	const http = http$1_.func;
	const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;
	const getGeneralToken = getGeneralToken$P.func;

	// Args
	leaveGroup.required = ['group'];
	leaveGroup.optional = [];

	// Docs
	/**
	 * 🔐 Leave a group.
	 * @category Group
	 * @alias leaveGroup
	 * @param {number} group - The id of the group.
	 * @returns {Promise<void>}
	 * @example const noblox = require("noblox.js")
	 * // Login using your cookie
	 * noblox.leaveGroup(1)
	**/

	// Define
	function leaveGroup$1 (group, jar, xcsrf, userId) {
	  return new Promise((resolve, reject) => {
	    const httpOpt = {
	      url: `https://groups.roblox.com/v1/groups/${group}/users/${userId}`,
	      options: {
	        method: 'DELETE',
	        resolveWithFullResponse: true,
	        jar,
	        headers: {
	          'X-CSRF-TOKEN': xcsrf
	        }
	      }
	    };

	    return http(httpOpt)
	      .then(function (res) {
	        const responseData = JSON.parse(res.body);
	        if (res.statusCode !== 200) {
	          let error = 'An unknown error has occurred.';
	          if (responseData && responseData.errors) {
	            error = responseData.errors.map((e) => e.message).join('\n');
	          }
	          reject(new Error(error));
	        } else {
	          resolve();
	        }
	      }).catch(error => reject(error))
	  })
	}

	leaveGroup.func = function (args) {
	  const jar = args.jar;
	  return getGeneralToken({ jar })
	    .then(async function (xcsrf) {
	      const currentUser = await getCurrentUser({ jar });
	      return leaveGroup$1(args.group, args.jar, xcsrf, currentUser.UserID)
	    })
	};
	return leaveGroup;
}

var onAuditLog = {};

// Includes
const shortPoll$5 = shortPoll$7.func;
const getAuditLog = getAuditLog$2.func;

// Args
onAuditLog.required = ['group'];
onAuditLog.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when an audit log event is added.
 * @category Group
 * @alias onAuditLog
 * @param {number} group - The id of the group.
 * @returns An EventEmitter that emits when an action is added to the audit log.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const auditEvent = noblox.onAuditLog(1)
 * auditEvent.on("data", function(data) {
 *  console.log("New action!", data)
 * })
 * auditEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onAuditLog.func = function (args) {
  let empty = false;
  return shortPoll$5({
    getLatest: function (latest) {
      return getAuditLog({ group: args.group, jar: args.jar, sortOrder: 'Desc' })
        .then(function (audit) {
          const given = [];
          if (audit) {
            for (const key in audit.data) {
              if (Object.prototype.hasOwnProperty.call(audit.data, key)) {
                const date = audit.data[key].created;

                if (date > latest) {
                  latest = date;
                  given.push(audit.data[key]);
                }
                empty = false;
              } else if (!empty) {
                const date = new Date();
                given.push({ audit: '', author: { name: '', id: '-1' }, date });
                latest = date;
                empty = true;
              }
            }
            return {
              latest,
              data: given
            }
          }
        })
    },
    delay: 'onAuditLog'
  })
};

var onJoinRequest = {};

// Includes
const settings$6 = require$$196;
const shortPoll$4 = shortPoll$7.func;
const getJoinRequests$1 = getJoinRequests$3.func;
const promiseTimeout$1 = timeout_1;

// Args
onJoinRequest.required = ['group'];
onJoinRequest.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone makes a request to join the group.
 * @category Group
 * @alias onJoinRequest
 * @param {number} group - The id of the group.
 * @returns An EventEmitter that emits when someone tries to join.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const e = noblox.onJoinRequest()
 * e.on("data", function(data) {
 *  console.log("New request!", data)
 * })
 * e.on("error", function (err) {
 *   ...
 * })
 **/

async function getRequests$1 (jar, group, cursor) {
  const requests = [];
  const res = await promiseTimeout$1(getJoinRequests$1({ jar, group, cursor, limit: 100 }), settings$6.event.timeout, 'getRequests onJoinRequests internal');
  requests.push.apply(requests, res.data);
  if (res.nextPageCursor) {
    requests.push.apply(requests, await getRequests$1(jar, group, res.nextPageCursor));
  }
  return requests
}

// Define
onJoinRequest.func = function (args) {
  return shortPoll$4({
    getLatest: function (latest) {
      return getRequests$1(args.jar, args.group)
        .then(function (requests) {
          const given = [];
          for (const key in requests) {
            if (Object.prototype.hasOwnProperty.call(requests, key)) {
              const date = new Date(requests[key].created.slice(0, requests[key].created.lastIndexOf('.')));
              if (date > latest) {
                latest = date;
                given.push(requests[key]);
              }
            }
          }
          return {
            latest,
            data: given
          }
        })
    },
    delay: 'onJoinRequest'
  })
};

var onJoinRequestHandle = {};

// Includes
const settings$5 = require$$196;
const shortPoll$3 = shortPoll$7.func;
const getJoinRequests = getJoinRequests$3.func;
const handleJoinRequest = handleJoinRequest$2.func;
const promiseTimeout = timeout_1;

// Args
onJoinRequestHandle.required = ['group'];
onJoinRequestHandle.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone is added to the join requests, which allows you to handle the join request as part of a
 * screening process. Emits all join requests and waits until all of them have been resolved by firing the handle event
 * with the request and either true or false. You can also pass a third argument callback to handle to execute once the
 * join request has been handled.
 * Once all requests on a page have been resolved, the next page is collected. Make sure that all join requests are handled in some way.
 * Because this function has to wait for input, it does handle timeouts but does them within the function as opposed to within shortPoll.
 *
 * The use of this function is generally pretty complex. If it is not as working as you expect, you may actually be wanting
 * to use `onJoinRequest`.
 * @category Group
 * @alias onJoinRequestHandle
 * @param {number} group - The id of the group.
 * @returns An EventEmitter that emits when someone tries to join.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 *
 * var blacklist = [1, 261]
 * var evt = noblox.onJoinRequestHandle(18)
 * evt.on('data', function (request) {
 * noblox.getIdFromUsername(request.username).then(function (id) {
 * for (var i = 0; i < blacklist.length; i++) {
 *    if (blacklist[i] === id) {
 *      evt.emit('handle', request, false);
 *      return;
 *    }
 *  }
 *  evt.emit('handle', request, true, function () {
 *    console.log(`Welcome ${id} to the group`)
 *  });
 *});
 *});
**/

async function getRequests (jar, group, cursor) {
  const requests = [];
  const res = await promiseTimeout(getJoinRequests({ jar, group, cursor, limit: 100 }), settings$5.event.timeout);
  requests.push.apply(requests, res.data);
  if (res.nextPageCursor) {
    requests.push.apply(requests, await getRequests(jar, group, res.nextPageCursor));
  }
  return requests
}

// Define
onJoinRequestHandle.func = function (args) {
  const group = args.group;
  const jar = args.jar;
  function getLatest (latest, evt) {
    return getRequests(jar, group)
      .then(function (requests) {
        const complete = {
          data: [],
          latest: -2,
          repeat: requests.length >= 20
        };
        let handled = 0;
        let promise;
        if (requests.length > 0) {
          promise = new Promise(function (resolve, reject) {
            evt.on('handle', function (request, accept, callback) {
              const id = request.requester.userId;
              handleJoinRequest({ jar, group, userId: id, accept })
                .then(function () {
                  handled++;
                  if (callback) {
                    callback();
                  }
                  if (handled === requests.length) {
                    evt.removeAllListeners('handle');
                    resolve(complete);
                  }
                })
                .catch(reject);
            });
          });
        }
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          evt.emit('data', request);
        }
        if (requests.length > 0) {
          return promise
        }
        return complete
      })
  }
  return shortPoll$3({
    getLatest,
    delay: 'onJoinRequestHandle',
    timeout: -1
  })
};

var onShout = {};

// Includes
const shortPoll$2 = shortPoll$7.func;
const getShout = getShout$2.func;

// Args
onShout.required = ['group'];
onShout.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when the shout is changed.
 * @category Group
 * @alias onShout
 * @param {number} group - The id of the group.
 * @returns An EventEmitter that emits when someone shouts.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const shoutEvent = noblox.onShout(1)
 * shoutEvent.on("data", function(data) {
 *  console.log("New Shout!", data)
 * })
 * shoutEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onShout.func = function (args) {
  let empty = false;
  return shortPoll$2({
    getLatest: function (latest) {
      return getShout({ group: args.group, jar: args.jar })
        .then(function (shout) {
          const given = [];
          if (shout) {
            const date = new Date(shout.updated.slice(0, shout.updated.lastIndexOf('.')));
            if (date > latest) {
              latest = date;
              given.push(shout);
            }
            empty = false;
          } else if (!empty) {
            const date = new Date();
            given.push({ message: '', author: { name: '', id: '-1' }, date });
            latest = date;
            empty = true;
          }
          return {
            latest,
            data: given
          }
        })
    },
    delay: 'onShout'
  })
};

var onWallPost = {};

// Includes
const shortPoll$1 = shortPoll$7.func;
const getWall = getWall$1.func;

// Args
onWallPost.required = ['group'];
onWallPost.optional = ['view', 'jar'];

// Docs
/**
 * 🔐 An event for when someone posts on the group wall.
 * @category Group
 * @alias onWallPost
 * @param {number} group - The id of the group.
 * @returns An EventEmitter that emits when someone posts on the group wall.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const wallpostEvent = noblox.onWallPost(1)
 * wallpostEvent.on("data", function(data) {
 *  console.log("New post!", data)
 * })
 * wallpostEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onWallPost.func = function (args) {
  const group = args.group;
  const jar = args.jar;
  const view = args.view;
  return shortPoll$1({
    getLatest: function (latest) {
      return getWall({ group, jar, sortOrder: 'Desc' })
        .then(function (wall) {
          const posts = wall.data;
          const given = [];
          for (let i = posts.length - 1; i >= 0; i--) {
            const post = posts[i];
            const id = post.id;
            if (id > latest) {
              latest = id;
              if (view) {
                post.view = wall.views[post.parent.page];
              }
              given.push(post);
            }
          }
          return {
            latest,
            data: given
          }
        })
    },
    delay: 'onWallPost'
  })
};

var promote = {};

// Includes
const changeRank = changeRank$2.func;

// Args
promote.required = ['group', 'target'];
promote.optional = ['jar'];

// Docs
/**
 * 🔐 Promote a user.
 * @category Group
 * @alias promote
 * @param {number} group - The id of the group.
 * @param {number} target - The id of the user.
 * @returns {Promise<ChangeRankResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.promote(1, 2)
**/

// Define
promote.func = function (args) {
  args.change = 1;
  return changeRank(args)
};

var searchGroups = {};

// Includes
const getPageResults$7 = getPageResults$f.func;

// Args
searchGroups.required = ['keyword'];
searchGroups.optional = ['prioritizeExactMatch', 'limit'];

// Docs
/**
 * ✅ Searches for groups by a given search term.
 * @category Group
 * @alias searchGroups
 * @param {string} keyword - The keyword or search term to search by.
 * @param {boolean} [prioritizeExactMatch=false] - Whether or not to prioritize the exact match for the keyword
 * @param {number} [limit=100] - The maximum number of groups to return. Supply 0 to apply no limit, returning all results.
 * Note: This may significantly increase the time to execute and return potentially thousands of results.
 * @returns {Promise<GroupSearchItem[]>}
 * @example const noblox = require("noblox.js")
 * const groupInfo = await noblox.searchGroups("noblox.js");
 **/

// Define
searchGroups.func = async function (args) {
  const results = await getPageResults$7({
    url: '//groups.roblox.com/v1/groups/search',
    query: { keyword: args.keyword, prioritizeExactMatch: args.prioritizeExactMatch || false },
    // If limit is 0, pass undefined for infinite results. Otherwise, default to 100.
    limit: args.limit === 0 ? undefined : (args.limit || 100)
  });
  // Parse updated/created to Date objects.
  return results.map((g) => ({ created: new Date(g.created), updated: new Date(g.updated), ...g }))
};

var setGroupDescription = {};

// Includes
const http$j = http$1_.func;
const getGeneralToken$6 = getGeneralToken$P.func;

// Args
setGroupDescription.required = ['group'];
setGroupDescription.optional = ['description', 'jar'];

// Docs
/**
 * 🔐 Update a group description
 * @category Group
 * @alias setGroupDescription
 * @param {number} group - The id of the group.
 * @param {string=} [description=""] - The new description for the group
 * @returns {Promise<GroupDescriptionResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setGroupDescription(1, "Group Description!")
 **/

function changeGroupDesc (group, description = '', jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/description`,
      options: {
        method: 'PATCH',
        resolveWithFullResponse: true,
        json: {
          description
        },
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$j(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(res.body);
        } else {
          const body = res.body || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      })
  })
}

// Define
setGroupDescription.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$6({ jar })
    .then(function (xcsrf) {
      return changeGroupDesc(args.group, args.description, args.jar, xcsrf)
    })
};

var setGroupName = {};

// Includes
const http$i = http$1_.func;
const getGeneralToken$5 = getGeneralToken$P.func;

// Args
setGroupName.required = ['group', 'name'];
setGroupName.optional = ['jar'];

// Docs
/**
 * 🔐 Update a group name. This method will trigger a Robux charge to your account, and can only be performed by the group
 * owner.
 * @category Group
 * @alias setGroupName
 * @param {number} group - The id of the group.
 * @param {string=} name - The new name for the group
 * @returns {Promise<GroupNameResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setGroupName(1, "Cool group")
 **/

function changeGroupName (group, name, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/name`,
      options: {
        method: 'PATCH',
        resolveWithFullResponse: true,
        json: {
          name
        },
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$i(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(res.body);
        } else {
          const body = res.body || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      })
  })
}

// Define
setGroupName.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$5({ jar })
    .then(function (xcsrf) {
      return changeGroupName(args.group, args.name, args.jar, xcsrf)
    })
};

var setRoleInfo$1 = {};

// Includes
const http$h = http$1_.func;
const getGeneralToken$4 = getGeneralToken$P.func;
const getRole = getRole$3.func;

// Args
setRoleInfo$1.required = ['group', 'role', 'newRoleInfo'];
setRoleInfo$1.optional = ['jar'];

// Docs
/**
 * 🔐 Update a role's information
 * @category Group
 * @alias setRoleInfo
 * @param {number} group - The id of the group.
 * @param {number | string | Role} role - The rank, roleset ID, name of the role, or the actual Role itself.
 * @param {Role} newRoleInfo - The new info for the role
 * @returns {Promise<Role>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.setRoleInfo(1, 2342243, )
 **/

// Define
function setRoleInfo (jar, xcsrf, group, role, newRoleInfo) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${group}/rolesets/${role.id}`,
      options: {
        resolveWithFullResponse: true,
        method: 'PATCH',
        jar,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': xcsrf
        },
        body: JSON.stringify({
          name: newRoleInfo.name,
          rank: newRoleInfo.rank,
          description: newRoleInfo.description
        })
      }
    };
    return http$h(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          role.name = newRoleInfo.name;
          role.rank = newRoleInfo.rank;
          role.description = newRoleInfo.description;

          resolve(role);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      }).catch(error => reject(error))
  })
}

function runWithToken (args) {
  const jar = args.jar;
  return getGeneralToken$4({ jar })
    .then(function (xcsrf) {
      return setRoleInfo(jar, xcsrf, args.group, args.role, args.newRoleInfo)
    })
}

setRoleInfo$1.func = function (args) {
  if (typeof args.role === 'object') { // assumes they gave Role
    return runWithToken(args)
  } else if (typeof args.role === 'number' || typeof args.role === 'string') {
    return getRole({ group: args.group, roleQuery: args.role }).then((role) => {
      args.role = role;
      return runWithToken(args)
    })
  } else {
    throw new Error('Please provide either a Role, rank, or role name to change its info')
  }
};

var shout = {};

// Includes
const http$g = http$1_.func;
const getGeneralToken$3 = getGeneralToken$P.func;

// Args
shout.required = ['group'];
shout.optional = ['message', 'jar'];

// Docs
/**
 * 🔐 Change a group's shout.
 * @category Group
 * @alias shout
 * @param {number} group - The id of the group.
 * @param {string=} [message=""] - The message to shout
 * @returns {Promise<GroupShout>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.shout(1, "Hello world!")
**/

function shoutOnGroup (group, message = '', jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://groups.roblox.com/v1/groups/${group}/status`,
      options: {
        method: 'PATCH',
        resolveWithFullResponse: true,
        json: {
          message
        },
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf
        }
      }
    };

    return http$g(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(res.body);
        } else {
          const body = res.body || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      }).catch(error => reject(error))
  })
}

// Define
shout.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$3({ jar })
    .then(function (xcsrf) {
      return shoutOnGroup(args.group, args.message, args.jar, xcsrf)
    })
};

// Includes
const options = options$6;

// Define
var queue = function (type, index, func, handler) {
  const group = options.queue[type];
  if (!group[index]) {
    group[index] = {
      jobs: []
    };
  }
  const home = group[index];
  function run (time) {
    return function (resolve, reject) {
      setTimeout(function () {
        func().then(resolve).catch(reject);
      }, time);
    }
  }
  const jobs = home.jobs;
  function deactivate (err) {
    jobs.shift();
    if (!handler(err)) {
      home.last = Date.now();
    }
  }
  function next () {
    jobs.shift();
    home.last = Date.now();
  }
  if (group.delay > 0) {
    const delay = group.delay;
    const last = home.last;
    if (jobs.length === 0) {
      let item;
      const diff = Date.now() - last;
      if (!last || diff > delay) {
        item = func();
      } else {
        item = new Promise(run(delay - diff));
      }
      jobs.push(item);
      item.then(next).catch(deactivate);
      return item
    } else {
      const job = jobs[jobs.length - 1].then(function () {
        const item = new Promise(run(delay));
        item.then(next).catch(deactivate);
        return item
      }).catch(function (err) {
        const item = handler && handler(err) ? func() : new Promise(run(delay));
        item.then(next).catch(deactivate);
        return item
      });
      jobs.push(job);
      return job
    }
  } else {
    return func()
  }
};

var wrap = {};

/*
const args = ['jar', 'username', 'password']

raw function login (jar, username, password)

exported function login ()
  check number of arguments if necessary
    options object: login(arguments[0])
    individual arguments:
      for each argument add to an options array corresponding with argument order
      login(options)
*/

// Define
wrap.wrapExport = function (wrapFunction, required, optional) {
  const reqLength = required.length;
  if ((reqLength + optional.length) > 0) {
    return function () {
      let options = {};
      const length = arguments.length;
      let assume = false;
      if (length > 0) {
        const first = arguments[0];
        let collectOptions = true;
        if (length === 1 && (first instanceof Object)) {
          assume = true;
          const firstArg = required[0] || optional;
          if (firstArg && firstArg instanceof Object) {
            for (let i = 0; i < firstArg.length; i++) {
              if (first[firstArg[i]]) {
                options = first;
                collectOptions = false;
                break
              }
            }
          } else if (firstArg && first[firstArg]) {
            options = first;
            collectOptions = false;
          }
        }
        if (collectOptions) {
          for (let i = 0; i <= length; i++) {
            const list = (i >= reqLength ? optional : required);
            const index = list[(i >= reqLength ? (i - reqLength) : i)];
            if (index instanceof Object) {
              options[index[0]] = arguments[i];
            } else {
              options[index] = arguments[i];
            }
          }
        }
      }
      for (let i = 0; i < reqLength; i++) {
        const arg = required[i];
        let found = false;
        if (arg instanceof Object) {
          for (let k = 0; k <= arg.length; k++) {
            if (options[arg[k]] != null) {
              found = true;
              break
            }
          }
        } else if (options[arg] != null) {
          found = true;
        }
        if (!found) {
          if (assume) {
            throw new Error('A required argument is missing')
          } else {
            throw new Error('Required argument "' + (arg instanceof Object ? arg.join('/') : arg) + '" is missing')
          }
        }
      }
      return wrapFunction(options)
    }
  } else {
    return wrapFunction
  }
};

var getCollectibles$1 = {};

// Includes
const getPageResults$6 = getPageResults$f.func;

// Args
getCollectibles$1.required = ['userId'];
getCollectibles$1.optional = ['assetType', 'sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔓 Get a user's collectibles.
 * @category User
 * @alias getCollectibles
 * @param {number} userId - The id of the user whose collectibles are being retrieved.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the collectibles will bee sorted by (Asc or Desc)
 * @param {string=} assetType - The asset type for the collectibles you're trying to get.
 * @param {number} [limit=10] - The amount of results per request.
 * @returns {Promise<CollectibleEntry[]>}
 * @example const noblox = require("noblox.js")
 * let collectibles = await noblox.getCollectibles({userId: 123456, sortOrder: "Asc", limit: 100})
**/

// Define
getCollectibles$1.func = function (args) {
  return getPageResults$6({
    jar: args.jar,
    url: `//inventory.roblox.com/v1/users/${args.userId}/assets/collectibles`,
    query: { assetType: args.assetType },
    sortOrder: args.sortOrder,
    limit: args.limit
  })
};

var getInventory = {};

// Includes
const getPageResults$5 = getPageResults$f.func;

// Args
getInventory.required = ['userId', 'assetTypes'];
getInventory.optional = ['sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔓 Get a user's inventory.
 * NOTE: Badges must use [getPlayerBadges()]{@link https://noblox.js.org/global.html#getPlayerBadges} due to an issue with Roblox's API.
 * @category User
 * @alias getInventory
 * @param {number} userId - The id of user whose inventory is being returned.
 * @param {Array<string>} assetTypes - The types of assets being retrieved: [("Shirt", "Pants")]{@link https://developer.roblox.com/en-us/api-reference/enum/AssetType}.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data will be returned in (Asc or Desc)
 * @param {Limit=} [limit=10] - The number of assets returned in each request (10, 25, 50, or 100)
 * @returns {Promise<InventoryEntry[]>}
 * @example const noblox = require("noblox.js")
 * let inventory = await noblox.getInventory({userId: 123456, assetTypes: ["Shirt"], sortOrder: "Asc", limit: 100})
**/

// Define
getInventory.func = function (args) {
  return getPageResults$5({
    jar: args.jar,
    url: `//inventory.roblox.com/v2/users/${args.userId}/inventory`,
    query: { assetTypes: args.assetTypes.join(',') },
    sortOrder: args.sortOrder,
    limit: args.limit
  })
};

var getInventoryById = {};

// Includes
const getPageResults$4 = getPageResults$f.func;

// Args
getInventoryById.required = ['userId', 'assetTypeId'];
getInventoryById.optional = ['sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔓 Get a user's inventory.
 * @category User
 * @alias getInventoryById
 * @param {number} userId - The id of user whose inventory is being returned.
 * @param {Array<number>} assetTypeId - The types of assets being retrieved: [(11, 12)]{@link https://developer.roblox.com/en-us/api-reference/enum/AssetType}.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data will be returned in (Asc or Desc)
 * @param {Limit=} [limit=10] - The number of assets returned in each request (10, 25, 50, or 100)
 * @returns {Promise<InventoryEntry[]>}
 * @example const noblox = require("noblox.js")
 * let inventory = await noblox.getInventoryById({userId: 123456, assetTypeId: 2, sortOrder: "Asc", limit: 100})
**/

// Define
getInventoryById.func = function (args) {
  return getPageResults$4({
    jar: args.jar,
    url: `//inventory.roblox.com/v2/users/${args.userId}/inventory/${args.assetTypeId}`,
    query: {},
    sortOrder: args.sortOrder,
    limit: args.limit
  })
};

var getOwnership$1 = {};

// Includes
const http$f = http$1_.func;

// Args
getOwnership$1.required = ['userId', 'itemTargetId'];
getOwnership$1.optional = ['itemType'];

// Docs
/**
 * ✅ Check if the user owns the asset.
 * @category User
 * @alias getOwnership
 * @param {number} userId - The id of the user whose ownership is being checked.
 * @param {number} itemTargetId - The id of the item.
 * @param {("Asset" | "GamePass" | "Badge" | "Bundle")=} [itemType=Asset] - The type of item in question (Asset, GamePass, Badge, Bundle)
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * let ownership = await noblox.getOwnership(123456, 234567, "GamePass")
**/

// Define
function getOwnership (userId, itemTargetId, itemType) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//inventory.roblox.com/v1/users/${userId}/items/${itemType}/${itemTargetId}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true
      }
    };
    return http$f(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          const body = JSON.parse(res.body);
          resolve(body.data.length > 0);
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          } else {
            reject(new Error(`${res.statusCode} ${res.body}`));
          }
        }
      })
  })
}

getOwnership$1.func = function (args) {
  const itemType = args.itemType || 'Asset';
  return getOwnership(args.userId, args.itemTargetId, itemType)
};

var getUAIDs$1 = {};

// Includes
const getCollectibles = getCollectibles$1.func;

// Args
getUAIDs$1.required = ['userId', 'assetIds'];
getUAIDs$1.optional = ['exclusionList', 'jar'];

// Docs
/**
 * ✅ Get a UserAssetID for a specific asset.
 * @category User
 * @alias getUAIDs
 * @param {number} userId - The id of the user to search.
 * @param {Array<number>} assetIds - The ids of the assets to retrieve.
 * @param {Array<number>=} exclusionList - The UAIDs to exclude from the search.
 * @returns {Promise<UAIDResponse>}
 * @example const noblox = require("noblox.js")
 * const UAIDInfo = await noblox.getUAIDs(80231025, [1974901902, 4255053867, 2705893733, 1532395])
**/

// Define
function getUAIDs (userId, requestedIds, excludedIds) {
  return new Promise((resolve) => {
    getCollectibles({ userId }).then(function (collectibles) {
      const retrievedIds = [];

      for (let index = 0; index < collectibles.length; index++) {
        const collectible = collectibles[index];
        const requestIndex = requestedIds.indexOf(collectible.assetId);

        if (requestIndex > -1 && excludedIds.indexOf(collectible.userAssetId) === -1) {
          requestedIds.splice(requestIndex, 1);
          retrievedIds.push(collectible.userAssetId);
        }
      }

      resolve({
        uaids: retrievedIds,
        failedIds: requestedIds
      });
    });
  })
}

getUAIDs$1.func = function (args) {
  return getUAIDs(args.userId, args.assetIds, args.exclusionList || [])
};

var getGroupAssets = {};

// Includes
const getPageResults$3 = getPageResults$f.func;

// Args
getGroupAssets.required = ['groupId', 'assetType'];
getGroupAssets.optional = ['sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔐 Get assets for a group.
 * @category Group
 * @alias getGroupAssets
 * @param {number} groupId - The id of the group.
 * @param {String} assetType - The type of asset being retrieved: [("Shirt", "Pants")]{@link https://developer.roblox.com/en-us/api-reference/enum/AssetType}.
 * @param {SortOrder=} [sortOrder=Asc] - The order results are sorted in.
 * @param {Limit=} [limit=∞] - The maximum number of assets to return
 * @returns {Promise<GroupAssetInfo[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const groupModels = await noblox.getGroupAssets({groupId: 1, assetType: 'Model', sortOrder: 'Asc', limit: '100'})
**/

// Define
getGroupAssets.func = function (args) {
  return getPageResults$3({
    jar: args.jar,
    url: '//itemconfiguration.roblox.com/v1/creations/get-assets',
    query: { assetType: args.assetType, groupId: args.groupId },
    sortOrder: args.sortOrder || 'Asc',
    limit: args.limit
  })
};

var onPartyDeleted = {};

const events$8 = require$$0$2;

const onNotification$8 = onNotification$f.func;

onPartyDeleted.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a party is deleted.
 * @category Party
 * @alias onPartyDeleted
 * @returns An EventEmitter that emits when a party is deleted.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyDeleted = noblox.onPartyDeleted()
 * partyDeleted.on("data", function(data) {
 *  console.log("Party deleted! ", data)
 * })
 * partyDeleted.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyDeleted.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$8.EventEmitter();
  const notifications = onNotification$8({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'PartyDeleted') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartyInvite = {};

const events$7 = require$$0$2;

const onNotification$7 = onNotification$f.func;

onPartyInvite.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when you're invited to a party.
 * @category Party
 * @alias onPartyInvite
 * @returns An EventEmitter that emits when you're invited to a party.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyInvite = noblox.onPartyInvite()
 * partyInvite.on("data", function(data) {
 *  console.log("Invited to party! ", data)
 * })
 * partyInvite.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyInvite.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$7.EventEmitter();
  const notifications = onNotification$7({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'InvitedToParty') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartyJoinedGame = {};

const events$6 = require$$0$2;

const onNotification$6 = onNotification$f.func;

onPartyJoinedGame.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a party joins a game.
 * @category Party
 * @alias onPartyJoinedGame
 * @returns An EventEmitter that emits when a party joins a game.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyJoinedGame = noblox.onPartyJoinedGame()
 * partyJoinedGame.on("data", function(data) {
 *  console.log("Party joined game! ", data)
 * })
 * partyJoinedGame.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyJoinedGame.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$6.EventEmitter();
  const notifications = onNotification$6({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'PartyJoinedGame') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartyLeftGame = {};

const events$5 = require$$0$2;

const onNotification$5 = onNotification$f.func;

onPartyLeftGame.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a party leaves a game.
 * @category Party
 * @alias onPartyLeftGame
 * @returns An EventEmitter that emits when a party leaves a game.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyLeftGame = noblox.onPartyLeftGame()
 * partyLeftGame.on("data", function(data) {
 *  console.log("Party left game! ", data)
 * })
 * partyLeftGame.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyLeftGame.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$5.EventEmitter();
  const notifications = onNotification$5({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'PartyLeftGame') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartySelfJoined = {};

const events$4 = require$$0$2;

const onNotification$4 = onNotification$f.func;

onPartySelfJoined.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when you join a party.
 * @category Party
 * @alias onPartySelfJoined
 * @returns An EventEmitter that emits when you join a party.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const joinedParty = noblox.onPartySelfJoined()
 * joinedParty.on("data", function(data) {
 *  console.log("You joined a party! ", data)
 * })
 * joinedParty.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartySelfJoined.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$4.EventEmitter();
  const notifications = onNotification$4({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'IJoinedParty') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartySelfLeft = {};

const events$3 = require$$0$2;

const onNotification$3 = onNotification$f.func;

onPartySelfLeft.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when you leave a party.
 * @category Party
 * @alias onPartySelfLeft
 * @returns An EventEmitter that emits when you leave a party.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const leftParty = noblox.onPartySelfLeft()
 * leftParty.on("data", function(data) {
 *  console.log("You left a party! ", data)
 * })
 * leftParty.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartySelfLeft.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$3.EventEmitter();
  const notifications = onNotification$3({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'ILeftParty') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartyUserJoined = {};

const events$2 = require$$0$2;

const onNotification$2 = onNotification$f.func;

onPartyUserJoined.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone joins a party.
 * @category Party
 * @alias onPartyUserJoined
 * @returns An EventEmitter that emits when someone joins a party.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyJoined = noblox.onPartyUserJoined()
 * partyJoined.on("data", function(data) {
 *  console.log("Someone joined a party! ", data)
 * })
 * partyJoined.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyUserJoined.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$2.EventEmitter();
  const notifications = onNotification$2({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'PartyUserJoined') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var onPartyUserLeft = {};

const events$1 = require$$0$2;

const onNotification$1 = onNotification$f.func;

onPartyUserLeft.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when someone leaves a party.
 * @category Party
 * @alias onPartyUserLeft
 * @returns An EventEmitter that emits when someone leaves a party.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const partyLeft = noblox.onPartyUserLeft()
 * partyLeft.on("data", function(data) {
 *  console.log("Someone left party! ", data)
 * })
 * partyLeft.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

onPartyUserLeft.func = (args) => {
  const jar = args.jar;
  const newEvent = new events$1.EventEmitter();
  const notifications = onNotification$1({ jar });

  notifications.on('data', (name, message) => {
    if (name === 'PartyNotifications' && message.Type === 'PartyUserLeft') {
      newEvent.emit('data', {
        PartyId: message.PartyId,
        PartyType: message.PartyType
      });
    }
  });

  notifications.on('error', (err) => {
    newEvent.emit('error', err);
  });

  notifications.on('connect', () => {
    newEvent.emit('connect');
  });

  notifications.on('close', (internal) => {
    if (internal) return
    notifications.emit('close', true);
  });

  return newEvent
};

var getPremium$1 = {};

// Includes
const http$e = http$1_.func;

// Args
getPremium$1.required = ['userId'];
getPremium$1.optional = ['jar'];

// Docs
/**
 * 🔐 Gets whether or not a user has premium.
 * @category User
 * @alias getPremium
 * @param {number} userId - The id of the user.
 * @returns {Promise<boolean>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const hasPremium = await noblox.getPremium(123456)
 **/

// Define
function getPremium (jar, userId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$e(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(res.body === 'true');
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getPremium$1.func = function (args) {
  const jar = args.jar;
  return getPremium(jar, args.userId)
};

var getPresences$1 = {};

// Includes
const http$d = http$1_.func;
const getGeneralToken$2 = getGeneralToken$P.func;

// Args
getPresences$1.required = ['userIds'];
getPresences$1.optional = [];

// Docs
/**
 * 🔐 Get the presence status of users.
 * @category Presence
 * @alias getPresences
 * @param {Array<number>} userIds - An array of userIds.
 * @returns {Promise<Presences>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const presences = await noblox.getPresences([1, 2, 3])
**/

// Define
function getPresences (userIds, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//presence.roblox.com/v1/presence/users',
      options: {
        method: 'POST',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIds
        })
      }
    };

    return http$d(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body);
        if (res.statusCode !== 200) {
          let error = 'An unknown error has occurred.';
          if (responseData && responseData.errors) {
            error = responseData.errors.map((e) => e.message).join('\n');
          }
          reject(new Error(error));
        } else {
          resolve(responseData);
        }
      })
      .catch(error => reject(error))
  })
}

getPresences$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$2({ jar })
    .then(function (xcsrf) {
      return getPresences(args.userIds, args.jar, xcsrf)
    })
};

var getMessages$2 = {};

// Includes
const http$c = http$1_.func;
// Args
getMessages$2.required = [];
getMessages$2.optional = ['pageNumber', 'pageSize', 'messageTab', 'jar'];

// Docs
/**
 * 🔐 Get the messages of the authenticated user.
 * @category User
 * @alias getMessages
 * @param {number=} [pageNumber=0] - The number of the current page.
 * @param {number=} [pageSize=25] - The size of the current page.
 * @param {("Inbox" | "Sent" | "Archive")=} [messageTab=Inbox] - The tab of the messages being fetched (Inbox, Sent, Archive)
 * @returns {Promise<PrivateMessagesPage>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * let messages = await noblox.getMessages(1, 10, "Inbox"))
**/

// Define
function getMessages$1 (jar, pageNumber, pageSize, messageTab) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//privatemessages.roblox.com/v1/messages?pageNumber=${pageNumber}&pageSize=${pageSize}&messageTab=${messageTab}`,
      options: {
        method: 'GET',
        jar,
        resolveWithFullResponse: true
      }
    };
    return http$c(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.body));
        } else {
          const body = JSON.parse(res.body) || {};
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            });
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
          }
        }
      })
  })
}

getMessages$2.func = function (args) {
  const jar = args.jar;
  const pageNumber = (args.pageNumber && args.pageNumber.toString()) || '0';
  const pageSize = (args.pageSize && args.pageSize.toString()) || '25';
  const messageTab = args.messageTab || 'Inbox';
  if (!['Inbox', 'Sent', 'Archive'].includes(messageTab)) {
    return new Promise((resolve, reject) => {
      reject(new Error('messageTab must be Inbox, Sent, or Archive'));
    })
  }
  return getMessages$1(jar, pageNumber, pageSize, messageTab)
};

var message = {};

var getSenderUserId = {};

var hasRequiredGetSenderUserId;

function requireGetSenderUserId () {
	if (hasRequiredGetSenderUserId) return getSenderUserId;
	hasRequiredGetSenderUserId = 1;
	// Includes
	const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;
	const getHash = getHash$2.func;
	const cache = cache$a;

	// Args
	getSenderUserId.optional = ['jar'];

	// Docs
	/**
	 * 🔐 Get the userId of the current user and cache it.
	 * @category Utility
	 * @alias getSenderUserId
	 * @param {CookieJar=} jar - The CookieJar containing the .ROBLOSECURITY cookie.
	 * @returns {Promise<number>}
	 * @example const noblox = require("noblox.js")
	 * // Login using your cookie.
	 * const userId = await noblox.getSenderUserId()
	**/

	// Define
	getSenderUserId.func = function (args) {
	  const jar = args.jar;
	  return cache.wrap('SenderID', getHash({ jar }), function () {
	    return getCurrentUser({ jar })
	      .then(function (info) {
	        return info.UserID
	      })
	  })
	};
	return getSenderUserId;
}

var hasRequiredMessage;

function requireMessage () {
	if (hasRequiredMessage) return message;
	hasRequiredMessage = 1;
	// Includes
	const http = http$1_.func;
	const queue$1 = queue;
	const getGeneralToken = getGeneralToken$P.func;
	const getHash = getHash$2.func;
	const getSenderId = /*@__PURE__*/ requireGetSenderUserId().func;

	// Args
	message.required = ['recipient', 'subject', 'body'];
	message.optional = ['replyMessageId', 'includePreviousMessage', 'jar'];

	// Docs
	/**
	 * 🔐 Send a message. NOTE: Roblox blocks web servers and proxies from sending messages.
	 * @category User
	 * @alias message
	 * @param {number} recipient - The id of the user.
	 * @param {string} subject - The subject of the message.
	 * @param {string} body - The body of the message.
	 * @param {number=} replyMessageId - The messageId to reply to.
	 * @param {boolean=} [includePreviousMessage=false] - The previous or next page cursor.
	 * @returns {Promise<void>}
	 * @example const noblox = require("noblox.js")
	 * // Login using your cookie
	 * noblox.message(1, "A subject", "A body", 1234, true)
	**/

	// Define
	function message$1 (jar, token, senderId, recipient, subject, body, replyMessageId, includePreviousMessage) {
	  return new Promise((resolve, reject) => {
	    const httpOpt = {
	      url: '//privatemessages.roblox.com/v1/messages/send',
	      options: {
	        method: 'POST',
	        jar,
	        headers: {
	          'X-CSRF-TOKEN': token,
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	          userId: senderId,
	          recipientId: recipient,
	          subject,
	          body,
	          replyMessageId,
	          includePreviousMessage
	        }),
	        resolveWithFullResponse: true
	      }
	    };
	    return http(httpOpt)
	      .then(function (res) {
	        if (res.statusCode === 200) {
	          resolve(JSON.parse(res.body));
	        } else {
	          const body = JSON.parse(res.body) || {};
	          if (body.errors && body.errors.length > 0) {
	            const errors = body.errors.map((e) => {
	              return e.message
	            });
	            reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
	          }
	        }
	      })
	  })
	}

	message.func = function (args) {
	  const jar = args.jar;
	  return queue$1('Message', getHash({ jar }), function () {
	    return getGeneralToken({ jar })
	      .then(function (xcsrf) {
	        return getSenderId({ jar }).then((senderId) => {
	          return message$1(jar, xcsrf, senderId, args.recipient, args.subject, args.body, args.replyMessageId, args.includePreviousMessage)
	        })
	      })
	  }, function () {
	    return true
	  })
	};
	return message;
}

var onMessage = {};

// Dependencies
const events = require$$0$2;

// Includes
const onNotification = onNotification$f.func;
const getMessages = getMessages$2.func;

// Args
onMessage.optional = ['jar'];

// Docs
/**
 * 🔐 An event for when a user sends you a message via. the older 'email-like' message system. To receive chat messages,
 * see the `onNewMessage` method.
 * @see [onNewMessage()](global.html#onNewMessage).
 * @category User
 * @alias onMessage
 * @returns An EventEmitter that emits when a user sends you a message.
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const messageEvent = noblox.onMessage()
 * messageEvent.on("data", function(data) {
 *  console.log("New message! ", data)
 * })
 * messageEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onMessage.func = function (args) {
  const jar = args.jar;
  const onMessage = new events.EventEmitter();
  let waitingForRequest = false;
  let latest;
  getMessages({ jar, messageTab: 'Inbox', pageNumber: 0, pageSize: 1 })
    .then(function (initial) {
      latest = initial.collection[0] ? initial.collection[0].id : 0;
      const notifications = onNotification({ jar });
      notifications.on('data', function (name, message) {
        if (name === 'MessageNotification' && message.Type === 'Created') {
          if (waitingForRequest) {
            waitingForRequest = false;
          } else {
            getMessages({
              jar,
              messageTab: 'Inbox',
              pageNumber: 0,
              pageSize: 1
            })
              .then(function (inbox) {
                const messages = inbox.collection;
                for (let i = messages.length - 1; i >= 0; i--) {
                  const message = messages[i];
                  const id = message.id;
                  if (id > latest) {
                    latest = id;
                    onMessage.emit('data', message);
                  }
                }
              });
          }
        } else if (name === 'FriendshipNotifications' && message.Type === 'FriendshipRequested') {
          waitingForRequest = true;
        }
      });
      notifications.on('error', function (err) {
        onMessage.emit('error', err);
      });
      notifications.on('connect', function () {
        onMessage.emit('connect');
      });
      notifications.on('close', function (internal) {
        if (internal) {
          return
        }
        onMessage.emit('close', true);
      });
      onMessage.on('close', function (internal) {
        if (internal) {
          return
        }
        notifications.emit('close', true);
      });
    });

  return onMessage
};

var getLogo$1 = {};

// Includes
const http$b = http$1_.func;

// Args
getLogo$1.required = ['group'];
getLogo$1.optional = ['size', 'circular', 'format'];

// Docs
/**
 * ✅ Get the group's logo.
 * @category Group
 * @alias getLogo
 * @param {number} group - The id of the group.
 * @param {GroupIconSize=} [size=150x150] - The size of the logo.
 * @param {boolean=} [circular=false] - Get the circular version of the logo.
 * @param {GroupIconFormat=} [format=Png] - The file format of the logo.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * const logo = await noblox.getLogo(1)
**/

// Define
function getLogo (group, size, circular, format) {
  const httpOpt = {
    url: '//thumbnails.roblox.com/v1/groups/icons',
    options: {
      qs: {
        groupIds: group,
        size: '150x150',
        format: 'Png',
        isCircular: circular
      },
      json: true
    }
  };
  return http$b(httpOpt)
    .then(function (body) {
      const error = body.errors && body.errors[0];

      if (error) {
        if (error.message === 'NotFound') {
          throw new Error('An invalid UserID or GroupID was provided.')
        } else {
          throw new Error(error.message)
        }
      }

      const thumbnailData = body.data[0];

      if (thumbnailData.state !== 'Completed') {
        throw new Error('The requested image has not been approved. Status: ' + thumbnailData.state)
      }

      return thumbnailData.imageUrl
    })
}

getLogo$1.func = function (args) {
  return getLogo(args.group)
};

var getPlayerThumbnail$1 = {};

// Includes
const http$a = http$1_.func;
const { thumbnail: settings$4 } = require$$196;

// Args
getPlayerThumbnail$1.required = ['userIds'];
getPlayerThumbnail$1.optional = ['size', 'format', 'isCircular', 'cropType', 'retryCount'];

// Variables
const eligibleSizes = {
  body: {
    sizes: ['30x30', '48x48', '60x60', '75x75', '100x100', '110x110', '140x140', '150x150', '150x200', '180x180', '250x250', '352x352', '420x420', '720x720'],
    endpoint: 'avatar'
  },
  bust: {
    sizes: ['48x48', '50x50', '60x60', '75x75', '100x100', '150x150', '180x180', '352x352', '420x420'],
    endpoint: 'avatar-bust'
  },
  headshot: {
    sizes: ['48x48', '50x50', '60x60', '75x75', '100x100', '110x110', '150x150', '180x180', '352x352', '420x420', '720x720'],
    endpoint: 'avatar-headshot'
  }
};

// Docs
/**
 * ✅ Get a user's thumbnail.
 * @category User
 * @alias getPlayerThumbnail
 * @param {number | Array<number>} userIds - The id or an array ids of thumbnails to be retrieved; 100
 * @param {number | string=} [size=720x720] - The [size of the image to be returned]{@link https://noblox.js.org/thumbnailSizes.png}; defaults highest resolution
 * @param {'png' | 'jpeg'=} [format=png] - The file format of the returned thumbnails
 * @param {boolean=} [isCircular=false] - Return the circular version of the thumbnails
 * @param {'Body' | 'Bust' | 'Headshot'=} [cropType=Body] - The style of thumbnail that will be returned
 * @returns {Promise<PlayerThumbnailData[]>}
 * @example const noblox = require("noblox.js")
 * let thumbnail_default = await noblox.getPlayerThumbnail(2416399685)
 * let thumbnail_circHeadshot = await noblox.getPlayerThumbnail(2416399685, 420, "png", true, "Headshot")
 * let thumbnails_body = await noblox.getPlayerThumbnail([2416399685, 234567, 345678], "150x200", "jpeg", false, "Body")
**/

// Define
function getPlayerThumbnail (userIds, size, format = 'png', isCircular = false, cropType = 'body', retryCount = settings$4.maxRetries) {
  // Validate userIds
  if (Array.isArray(userIds)) {
    if (userIds.some(isNaN)) {
      throw new Error('userIds must be a number or an array of numbers')
    }
    userIds = [...new Set(userIds)]; // get rid of duplicates, endpoint response does this anyway
    if (userIds.length > 100) {
      throw new Error(`too many userIds provided (${userIds.length}); maximum 100`)
    }
  } else {
    if (isNaN(userIds)) {
      throw new Error('userId is not a number')
    }
    userIds = [userIds];
  }

  // Validate cropType
  cropType = cropType.toLowerCase();
  if (!Object.keys(eligibleSizes).includes(cropType)) {
    throw new Error(`Invalid cropping type provided: ${cropType} | Use: ${Object.keys(eligibleSizes).join(', ')}`)
  }
  const { sizes, endpoint } = eligibleSizes[cropType];

  // Validate size
  size = size || sizes[sizes.length - 1];
  if (typeof size === 'number') {
    size = `${size}x${size}`;
  }
  if (!sizes.includes(size)) {
    throw new Error(`Invalid size parameter provided: ${size} | [${cropType.toUpperCase()}] Use: ${sizes.join(', ')}`)
  }

  // Validate format
  if (format.toLowerCase() !== 'png' && format.toLowerCase() !== 'jpeg') {
    throw new Error(`Invalid image type provided: ${format} | Use: png, jpeg`)
  }

  return http$a({
    url: `https://thumbnails.roblox.com/v1/users/${endpoint}?userIds=${userIds.join(',')}&size=${size}&format=${format}&isCircular=${!!isCircular}`,
    options: {
      resolveWithFullResponse: true,
      followRedirect: true
    }
  })
    .then(async ({ statusCode, body }) => {
      let { data, errors } = JSON.parse(body);
      if (statusCode === 200) {
        if (retryCount > 0) {
          const pendingThumbnails = data.filter(obj => { return obj.state === 'Pending' }).map(obj => obj.targetId); // Get 'Pending' thumbnails as array of userIds
          if (pendingThumbnails.length > 0) {
            await timeout$1(settings$4.retryDelay); // small delay helps cache populate on Roblox's end; default 500ms
            const updatedPending = await getPlayerThumbnail(pendingThumbnails, size, format, isCircular, cropType, --retryCount); // Recursively retry for # of maxRetries attempts; default 2
            data = data.map(obj => updatedPending.find(o => o.targetId === obj.targetId) || obj); // Update primary array's values
          }
        }
        data = data.map(obj => {
          if (obj.state !== 'Completed') {
            const settingsUrl = settings$4.failedUrl[obj.state.toLowerCase()]; // user defined settings.json default image URL for blocked or pending thumbnails; default ""
            obj.imageUrl = settingsUrl || `https://noblox.js.org/moderatedThumbnails/moderatedThumbnail_${size}.png`;
          }
          return obj
        });
        return data
      } else if (statusCode === 400) {
        throw new Error(`Error Code ${errors.code}: ${errors.message} | endpoint: ${endpoint}, userIds: ${userIds.join(',')}, size: ${size}, isCircular: ${!!isCircular}`)
      } else {
        throw new Error(`An unknown error occurred with getPlayerThumbnail() | endpoint: ${endpoint}, userIds: ${userIds.join(',')}, size: ${size}, isCircular: ${!!isCircular}`)
      }
    })
}

function timeout$1 (ms) {
  return new Promise(resolve => { setTimeout(resolve, ms); })
}

getPlayerThumbnail$1.func = function ({ userIds, size, format, isCircular, cropType, retryCount }) {
  return getPlayerThumbnail(userIds, size, format, isCircular, cropType, retryCount)
};

var getThumbnails$1 = {};

// Includes
const http$9 = http$1_.func;
const { thumbnail: settings$3 } = require$$196;

// Args
getThumbnails$1.required = ['thumbnailRequests'];
getThumbnails$1.optional = [];

// Docs
/**
 * ✅ Get thumbnails for assets/players.
 * @category Assets
 * @alias getThumbnails
 * @param {Array<ThumbnailRequest>} thumbnailRequests - The id or an array ids of thumbnails to be retrieved; 100
 * @returns {Promise<ThumbnailData[]>}
 * @example const noblox = require("noblox.js")
 * const playerThumbnails = noblox.getThumbnails([
 *  {
 *    type: "AvatarHeadShot",
 *    token: "270FF19ECB1AFCF25383A6F37C6AD307",
 *    format: "png",
 *    size: "150x150"
 *   }, {
 *    type: "AvatarBust",
 *    targetId: 55549140,
 *    isCircular: true,
 *    format: "png",
 *    size: "150x150"
 *   }
 * ])
**/

// Define
function getThumbnails (requests, retryCount = settings$3.maxRetries) {
  if (!Array.isArray(requests)) {
    throw new Error('thumbnailRequests are not an array')
  }

  requests = [...new Set(requests)];
  if (requests.length > 100) {
    throw new Error(`Too many thumbnailRequests provided (${requests.length}); maximum 100`)
  }

  for (const request of requests) {
    if (!request.size || !request.type) {
      throw new Error('thumbnailRequest must have a size and type')
    } else if (request.format && (request.format.toLowerCase() !== 'png' && request.format.toLowerCase() !== 'jpeg')) {
      throw new Error(`Invalid image type provided: ${request.format} | Use: png, jpeg`)
    }
  }

  return http$9({
    url: 'https://thumbnails.roblox.com/v1/batch',
    options: {
      method: 'POST',
      json: requests,
      resolveWithFullResponse: true,
      followRedirect: true
    }
  })
    .then(async ({ statusCode, body }) => {
      let { data, errors } = body;
      if (statusCode === 200) {
        if (retryCount > 0) {
          const pendingThumbnails = data.filter(obj => { return obj.state === 'Pending' }).map(obj => obj.targetId); // Get 'Pending' thumbnails as array of userIds
          if (pendingThumbnails.length > 0) {
            await timeout(settings$3.retryDelay); // small delay helps cache populate on Roblox's end; default 500ms
            const updatedPending = await getThumbnails(pendingThumbnails, --retryCount); // Recursively retry for # of maxRetries attempts; default 2
            data = data.map(obj => updatedPending.find(o => o.targetId === obj.targetId) || obj); // Update primary array's values
          }
        }
        data = data.map(obj => {
          if (obj.state !== 'Completed') {
            obj.imageUrl = settings$3.failedUrl[obj.state.toLowerCase()] || obj.imageUrl;
          }
          return obj
        });
        return data
      } else if (statusCode === 400) {
        throw new Error(`Error Code ${errors.code}: ${errors.message} | requests: ${JSON.stringify(requests)}`)
      } else {
        throw new Error(`An unknown error occurred with getThumbnails() | requests: ${JSON.stringify(requests)}`)
      }
    })
}

function timeout (ms) {
  return new Promise(resolve => { setTimeout(resolve, ms); })
}

getThumbnails$1.func = function ({ thumbnailRequests }) {
  return getThumbnails(thumbnailRequests)
};

var acceptTrade$1 = {};

// Includes
const http$8 = http$1_.func;
const getGeneralToken$1 = getGeneralToken$P.func;

// Args
acceptTrade$1.required = ['tradeId'];
acceptTrade$1.optional = ['jar'];

// Docs
/**
 * 🔐 Accept an active trade.
 * @category Trade
 * @alias acceptTrade
 * @param {number} tradeId - The tradeId to accept.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.acceptTrade(1234)
**/

// Define
function acceptTrade (tradeId, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    http$8({
      url: '//trades.roblox.com/v1/trades/' + tradeId + '/accept',
      options: {
        method: 'POST',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf,
          'Content-Type': 'application/json'
        }
      }
    }).then((res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        const body = JSON.parse(res.body) || {};

        if (body.errors && body.errors.length > 0) {
          const errors = body.errors.map((e) => {
            return e.message
          });
          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
        }
      }
    }).catch(error => reject(error));
  })
}

acceptTrade$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken$1({ jar })
    .then(function (xcsrf) {
      return acceptTrade(args.tradeId, jar, xcsrf)
    })
};

var canTradeWith$1 = {};

// Includes
const http$7 = http$1_.func;

// Args
canTradeWith$1.required = ['userId'];
canTradeWith$1.optional = ['jar'];

// Docs
/**
 * 🔐 Check if the signed in user can trade with another user.
 * @category Trade
 * @alias canTradeWith
 * @param {number} userId - The id of the user.
 * @returns {Promise<CanTradeResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const canTrade = await noblox.canTradeWith(1234)
**/

// Define
function canTradeWith (jar, userId) {
  return new Promise((resolve, reject) => {
    http$7({
      url: '//trades.roblox.com/v1/users/' + userId + '/can-trade-with',
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    }).then((res) => {
      if (res.statusCode === 200) {
        resolve(JSON.parse(res.body));
      } else {
        const body = JSON.parse(res.body) || {};
        if (body.errors && body.errors.length > 0) {
          const errors = body.errors.map((e) => {
            return e.message
          });
          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
        }
      }
    }).catch(error => reject(error));
  })
}

canTradeWith$1.func = (args) => {
  return canTradeWith(args.jar, args.userId)
};

var counterTrade = {};

var hasRequiredCounterTrade;

function requireCounterTrade () {
	if (hasRequiredCounterTrade) return counterTrade;
	hasRequiredCounterTrade = 1;
	// Includes
	const http = http$1_.func;
	const getGeneralToken = getGeneralToken$P.func;
	const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;

	// Args
	counterTrade.required = ['tradeId', 'targetUserId', 'sendingOffer', 'receivingOffer'];
	counterTrade.optional = ['jar'];

	// Docs
	/**
	 * 🔐 Counter an active incoming trade.
	 * @category Trade
	 * @alias counterTrade
	 * @param {number} tradeId - The id of the active trade
	 * @param {number} targetUserId - The user to send the trade to.
	 * @param {TradeOffer} sendingOffer - The offer to send to the other user.
	 * @param {TradeOffer} recievingOffer - The offer you are requesting from the other user.
	 * @returns {Promise<SendTradeResponse>}
	 * @example const noblox = require("noblox.js")
	 * // Login using your cookie
	 * noblox.counterTrade(1234, 80231025, { userAssetIds: [23289506393] }, { userAssetIds: [32924150919] })
	**/

	// Define
	function counterTrade$1 (tradeId, targetUserId, sendingOffer, receivingOffer, jar, xcsrf, loggedInUser) {
	  return new Promise((resolve, reject) => {
	    if (!sendingOffer.userAssetIds || !receivingOffer.userAssetIds) {
	      reject(new Error('Both offers must includes userAssetIds.'));
	    }

	    if (!sendingOffer.robux) sendingOffer.robux = 0;
	    if (!receivingOffer.robux) receivingOffer.robux = 0;

	    http({
	      url: '//trades.roblox.com/v1/trades/' + tradeId + '/counter',
	      options: {
	        method: 'POST',
	        resolveWithFullResponse: true,
	        jar,
	        headers: {
	          'X-CSRF-TOKEN': xcsrf,
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	          offers: [
	            {
	              userId: targetUserId,
	              ...receivingOffer
	            },
	            {
	              userId: loggedInUser,
	              ...sendingOffer
	            }
	          ]
	        })
	      }
	    }).then((res) => {
	      if (res.statusCode === 200) {
	        resolve(JSON.parse(res.body));
	      } else {
	        const body = JSON.parse(res.body) || {};

	        if (body.errors && body.errors.length > 0) {
	          const errors = body.errors.map((e) => {
	            return e.message
	          });
	          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
	        }
	      }
	    }).catch(error => reject(error));
	  })
	}

	counterTrade.func = function (args) {
	  const jar = args.jar;
	  return Promise.all([
	    getGeneralToken({ jar }),
	    getCurrentUser({ jar, option: 'UserID' })
	  ])
	    .then(function (resolvedPromises) {
	      return counterTrade$1(args.tradeId, args.targetUserId, args.sendingOffer, args.receivingOffer, jar, resolvedPromises[0], resolvedPromises[1])
	    })
	};
	return counterTrade;
}

var declineTrade$1 = {};

// Includes
const http$6 = http$1_.func;
const getGeneralToken = getGeneralToken$P.func;

// Args
declineTrade$1.required = ['tradeId'];
declineTrade$1.optional = ['jar'];

// Docs
/**
 * 🔐 Decline an active trade.
 * @category Trade
 * @alias declineTrade
 * @param {number} tradeId - The tradeId to decline.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.declineTrade(1234)
**/

// Define
function declineTrade (tradeId, jar, xcsrf) {
  return new Promise((resolve, reject) => {
    http$6({
      url: '//trades.roblox.com/v1/trades/' + tradeId + '/decline',
      options: {
        method: 'POST',
        resolveWithFullResponse: true,
        jar,
        headers: {
          'X-CSRF-TOKEN': xcsrf,
          'Content-Type': 'application/json'
        }
      }
    }).then((res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        const body = JSON.parse(res.body) || {};

        if (body.errors && body.errors.length > 0) {
          const errors = body.errors.map((e) => {
            return e.message
          });
          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
        }
      }
    }).catch(error => reject(error));
  })
}

declineTrade$1.func = function (args) {
  const jar = args.jar;
  return getGeneralToken({ jar })
    .then(function (xcsrf) {
      return declineTrade(args.tradeId, jar, xcsrf)
    })
};

var getTradeInfo$1 = {};

// Includes
const http$5 = http$1_.func;

// Args
getTradeInfo$1.required = ['tradeId'];
getTradeInfo$1.optional = ['jar'];

// Docs
/**
 * 🔐 Get detailed information for a specific trade.
 * @category Trade
 * @alias getTradeInfo
 * @param {number} tradeId - The id of the trade.
 * @returns {Promise<TradeInfo>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const tradeInfo = await noblox.getTradeInfo(1234)
**/

// Define
const getTradeInfo = (jar, tradeId) => {
  return new Promise((resolve, reject) => {
    http$5({
      url: '//trades.roblox.com/v1/trades/' + tradeId,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar
      }
    }).then((res) => {
      if (res.statusCode === 200) {
        const body = JSON.parse(res.body);
        body.created = new Date(body.created);
        if (body.expiration) body.expiration = new Date(body.expiration);

        resolve(body);
      } else {
        const body = JSON.parse(res.body) || {};
        if (body.errors && body.errors.length > 0) {
          const errors = body.errors.map((e) => {
            return e.message
          });
          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
        }
      }
    }).catch(error => reject(error));
  })
};

getTradeInfo$1.func = (args) => {
  return getTradeInfo(args.jar, args.tradeId)
};

var getTrades = {};

// Includes
const getPageResults$2 = getPageResults$f.func;

// Args
getTrades.required = ['tradeStatusType'];
getTrades.optional = ['sortOrder', 'limit', 'jar'];

// Docs
/**
 * 🔐 Get the trades for a specific category.
 * @category Trade
 * @alias getTrades
 * @param {string} tradeStatusType - The status of the trades to get [Inbound, Outbound, Complete, Inactive].
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data will be returned in (Asc or Desc)
 * @param {Limit=} [limit=10] - The number of assets returned in each request (10, 25, 50, or 100)
 * @returns {Promise<TradeAsset[]>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const trades = await noblox.getTrades("Inbound")
**/

// Define
getTrades.func = function (args) {
  return getPageResults$2({
    jar: args.jar,
    url: `//trades.roblox.com/v1/trades/${args.tradeStatusType}`,
    sortOrder: args.sortOrder,
    limit: args.limit
  }).then(function (results) {
    results.forEach(result => {
      result.created = new Date(result.created);
      if (result.expiration) result.expiration = new Date(result.expiration);
    });

    return results
  })
};

var sendTrade = {};

var hasRequiredSendTrade;

function requireSendTrade () {
	if (hasRequiredSendTrade) return sendTrade;
	hasRequiredSendTrade = 1;
	// Includes
	const http = http$1_.func;
	const getGeneralToken = getGeneralToken$P.func;
	const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;

	// Args
	sendTrade.required = ['targetUserId', 'sendingOffer', 'receivingOffer'];
	sendTrade.optional = ['jar'];

	// Docs
	/**
	 * 🔐 Send a trade to another user.
	 * @category Trade
	 * @alias sendTrade
	 * @param {number} targetUserId - The user to send the trade to.
	 * @param {TradeOffer} sendingOffer - The offer to send to the other user.
	 * @param {TradeOffer} recievingOffer - The offer you are requesting from the other user.
	 * @returns {Promise<SendTradeResponse>}
	 * @example const noblox = require("noblox.js")
	 * noblox.sendTrade(80231025, { userAssetIds: [23289506393] }, { userAssetIds: [32924150919] })
	**/

	// Define
	function sendTrade$1 (targetUserId, sendingOffer, receivingOffer, jar, xcsrf, loggedInUser) {
	  return new Promise((resolve, reject) => {
	    if (!sendingOffer.userAssetIds || !receivingOffer.userAssetIds) {
	      reject(new Error('Both offers must includes userAssetIds.'));
	    }

	    if (!sendingOffer.robux) sendingOffer.robux = 0;
	    if (!receivingOffer.robux) receivingOffer.robux = 0;

	    http({
	      url: '//trades.roblox.com/v1/trades/send',
	      options: {
	        method: 'POST',
	        resolveWithFullResponse: true,
	        jar,
	        headers: {
	          'X-CSRF-TOKEN': xcsrf,
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	          offers: [
	            {
	              userId: targetUserId,
	              ...receivingOffer
	            },
	            {
	              userId: loggedInUser,
	              ...sendingOffer
	            }
	          ]
	        })
	      }
	    }).then((res) => {
	      if (res.statusCode === 200) {
	        resolve(JSON.parse(res.body));
	      } else {
	        const body = JSON.parse(res.body) || {};

	        if (body.errors && body.errors.length > 0) {
	          const errors = body.errors.map((e) => {
	            return e.message
	          });
	          reject(new Error(`${res.statusCode} ${errors.join(', ')}`));
	        }
	      }
	    }).catch(error => reject(error));
	  })
	}

	sendTrade.func = function (args) {
	  const jar = args.jar;
	  return Promise.all([
	    getGeneralToken({ jar }),
	    getCurrentUser({ jar, option: 'UserID' })
	  ])
	    .then(function (resolvedPromises) {
	      return sendTrade$1(args.targetUserId, args.sendingOffer, args.receivingOffer, jar, resolvedPromises[0], resolvedPromises[1])
	    })
	};
	return sendTrade;
}

var getBlurb$1 = {};

// Includes
const http$4 = http$1_.func;

// Args
getBlurb$1.required = ['userId'];

// Docs
/**
 * ✅ Get a user's blurb - a user's description.
 * @category User
 * @deprecated Obsolete function, will be deleted in future version. Use getPlayerInfo instead.
 * @alias getBlurb
 * @param {number} userId - The id of the user's blurb that is being retrieved.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * let blurb = await noblox.getBlurb({ userId: 123456 })
**/

// Define
getBlurb$1.func = function (args) {
  return http$4({
    url: `//users.roblox.com/v1/users/${args.userId}`,
    options: {
      resolveWithFullResponse: true,
      followRedirect: false
    }
  })
    .then(function (res) {
      if (res.statusCode === 200) {
        const parsedBody = JSON.parse(res.body);
        return parsedBody.description
      } else {
        throw new Error('User does not exist')
      }
    })
};

var getIdFromUsername$1 = {};

// Includes
const http$3 = http$1_.func;
const cache$2 = cache$a;

// Args
getIdFromUsername$1.required = ['username'];

// Docs
/**
 * ✅ Get a user's id from their username.
 * @category User
 * @alias getIdFromUsername
 * @param {string | string[]} usernames - The username or usernames of the account(s) whose id(s) is being fetched.
 * @returns {Promise<number> | Promise<number[]>}
 * @example const noblox = require("noblox.js")
 * let ids = await noblox.getIdFromUsername(["ROBLOX", "Qxest", "builderman"])
**/

// Define
function getIdFromUsername (usernames) {
  usernames = Array.isArray(usernames) ? usernames : [usernames]; // cast usernames to array if necessary

  const httpOpt = {
    url: 'https://users.roblox.com/v1/usernames/users',
    options: {
      method: 'POST',
      json: {
        usernames,
        excludeBannedUsers: false
      }
    }
  };
  return http$3(httpOpt)
    .then(function (body) {
      const data = body.data;

      let results = usernames.map((username) => {
        return data.find((result) => result.requestedUsername === username)
      });

      results = results.map((result) => result !== undefined ? result.id : null);

      return results.length > 1 ? results : results[0]
    })
}

getIdFromUsername$1.func = function (args) {
  const usernames = Array.isArray(args.username) ? args.username : [args.username]; // cast usernames to array if necessary
  // Case does not affect the result and should not affect the cache
  return cache$2.wrap('IDFromName', usernames.map(username => username.toLowerCase()), function () {
    return getIdFromUsername(usernames)
  })
};

var getPlayerInfo$1 = {};

var getUserInfo$1 = {};

// Includes
const http$2 = http$1_.func;

// Args
getUserInfo$1.required = ['userId'];

// Docs
/**
 * ✅ Get base-level user profile information
 * @category User
 * @alias getUserInfo
 * @param { number } userId
 * @returns {Promise<UserInfo>}
**/

// Define
getUserInfo$1.func = function (args) {
  const httpOpt = {
    url: `//users.roblox.com/v1/users/${args.userId}`,
    options: {
      json: true,
      method: 'GET',
      resolveWithFullResponse: true
    }
  };

  return http$2(httpOpt).then(function (res) {
    if (res.statusCode !== 200) { throw new Error(`Failed to fetch user information: ${res.body?.errors?.at(0)?.message}`) }

    res.body.created = new Date(res.body.created);

    return res.body
  })
};

// Includes
const settings$2 = require$$196;
const getFollowingCount = getFollowingCount$1.func;
const getFollowerCount = getFollowerCount$1.func;
const getFriendCount$1 = getFriendCount$2.func;
const getUserInfo = getUserInfo$1.func;

// Args
getPlayerInfo$1.required = ['userId'];

// Docs
/**
 * ✅ Get a user's information.
 * @category User
 * @alias getPlayerInfo
 * @param { number } userId - The id of the user.
 * @returns {Promise<PlayerInfo>}
 * @deprecated `getPlayerInfo()` is deprecated; see `getUserInfo()`, `getFollowerCount()`, `getFollowingCount()`, `getFriendCount()`, `getUsernameHistory()`, `getUserFunds()`, `getPlayerThumbnail()` instead - high rate limits on endpoints such as username history and follower count have made this aggregate function not suitable for most users
 * @example const noblox = require("noblox.js")
 * let information = await noblox.getPlayerInfo({userId: 123456})
 **/

// Define
function getPlayerInfo (userId) {
  return new Promise((resolve, reject) => {
    const requests = [
      getUserInfo({ userId }),
      getFriendCount$1({ userId }),

      getFollowingCount({ userId }),
      getFollowerCount({ userId })
    ].map((promise) =>
      promise.then(
        (val) => ({ status: 'fulfilled', value: val }),
        (rej) => ({ status: 'rejected', reason: rej })
      )
    );

    Promise.all(requests).then((promiseResponses) => {
      const responses = promiseResponses.map((response) => response.value);
      const userBody = responses[0];
      const failedResponses = promiseResponses.filter(
        (presponse) => presponse.status === 'rejected'
      );

      if (userBody?.isBanned) {
        const joinDate = new Date(userBody.created);
        const blurb = userBody.description;
        const isBanned = userBody.isBanned;
        const username = userBody.name;
        const displayName = userBody.displayName;

        resolve({
          username,
          joinDate,
          blurb,
          isBanned,
          displayName
        });
      } else if (failedResponses.length) {
        const failureReason = failedResponses
          .map((response) => response.reason)
          .join('\n');

        if (
          (failureReason.toLowerCase().includes('too many requests') ||
            failureReason.toLowerCase().includes('(429')) &&
          settings$2.show_deprecation_warnings
        ) {
          console.warn();
          console.warn(
            '=============================================================================================================================================================================================='
          );
          console.warn(
            'DEPRECATION WARNING: getPlayerInfo is an aggregate of multiple endpoints, rate limit changes have made this method unsuitable for many people, please use the individualized endpoints instead'
          );
          console.warn(
            ' see getUserInfo(), getFollowerCount(), getFollowingCount(), getFriendCount(), getUsernameHistory(), getUserFunds(), getPlayerThumbnail()'
          );
          console.warn();
          console.warn(
            '> Opt out of these warnings using noblox.setOptions({ show_deprecation_warnings: false })'
          );
          console.warn(
            '=============================================================================================================================================================================================='
          );
          console.warn();
        }

        const error = failedResponses.map((r) => r.reason).join('\n');
        reject(new Error(error));
      } else {
        const responseBodies = responses.map((res) => res.body ?? res);
        const friendCount = responseBodies[1];
        const followerCount = responseBodies[3];
        const followingCount = responseBodies[2];
        const joinDate = new Date(userBody.created);
        const blurb = userBody.description;
        const isBanned = userBody.isBanned;
        const username = userBody.name;
        const displayName = userBody.displayName;

        const currentTime = new Date();
        const age = Math.round(
          Math.abs(
            (joinDate.getTime() - currentTime.getTime()) / (24 * 60 * 60 * 1000)
          )
        );

        resolve({
          username,
          displayName,
          blurb,
          joinDate,
          age,
          friendCount,
          followerCount,
          followingCount,
          isBanned
        });
      }
    });
  })
}

getPlayerInfo$1.func = (args) => {
  return getPlayerInfo(args.userId)
};

var getUsernameFromId$1 = {};

// Includes
const http$1 = http$1_.func;
const cache$1 = cache$a;

// Args
getUsernameFromId$1.required = ['id'];

// Docs
/**
 * ✅ Get a user's username from their user id.
 * @category User
 * @alias getUsernameFromId
 * @param {number} id - The id of the user.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * let username = await noblox.getUsernameFromId(123456)
**/

// Define
function getUsernameFromId (id) {
  const httpOpt = {
    url: `//users.roblox.com/v1/users/${id}`,
    options: {
      resolveWithFullResponse: true,
      method: 'GET'
    }
  };
  return http$1(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        const json = JSON.parse(res.body);
        return json.name
      } else {
        throw new Error('User does not exist')
      }
    })
}

getUsernameFromId$1.func = function (args) {
  const id = args.id;
  return cache$1.wrap('NameFromID', id, function () {
    return getUsernameFromId(id)
  })
};

var getUsernameHistory$1 = {};

// Includes
const getPageResults$1 = getPageResults$f.func;
const cache = cache$a;

// Args
getUsernameHistory$1.required = ['userId'];
getUsernameHistory$1.optional = ['limit', 'sortOrder', 'pageCursor'];

// Docs
/**
 * ✅ Get a user's username history.
 * @category User
 * @alias getUsernameHistory
 * @param {number} userId
 * @param {Limit=} [limit=100]
 * @param {SortOrder=} [sortOrder=Asc]
 * @param {string} cursor
 * @returns {Promise<UsernameHistoryEntry[]>}
 * @example const noblox = require("noblox.js")
 * const history = await noblox.getUsernameHistory({ userId: 1, limit: 10, sortOrder: "Asc", cursor: "somecursorstring" })
**/

// Define
function getUsernameHistory (userId, limit, sortOrder, cursor) {
  return getPageResults$1({
    url: `//users.roblox.com/v1/users/${userId}/username-history`,
    query: {},
    limit,
    pageCursor: cursor,
    sortOrder
  })
}

getUsernameHistory$1.func = function (args) {
  let { userId, limit, sortOrder, cursor } = args;
  limit ||= 100;
  sortOrder ||= 'Asc';

  return cache.wrap('UsernameHistory', `${userId}-${limit}-${sortOrder}-${cursor}`, function () {
    return getUsernameHistory(userId, limit, sortOrder, cursor)
  })
};

var onBlurbChange = {};

// Includes
const shortPoll = shortPoll$7.func;
const getBlurb = getBlurb$1.func;

// Args
onBlurbChange.required = ['userId'];

// Docs
/**
 * ✅ An event for when a user's blurb changes.
 * @category User
 * @alias onBlurbChange
 * @param {number} userId - The id of the user.
 * @returns An EventEmitter that emits when a user's blurb changes.
 * @example const noblox = require("noblox.js")
 * const blurbEvent = noblox.onBlurbChange(1)
 * blurbEvent.on("data", function(data) {
 *  console.log("User's blurb changed!", data)
 * })
 * blurbEvent.on("error", function(err) {
 *  console.error("Something went wrong: ", err)
 *  // Handle error as needed
 * })
**/

// Define
onBlurbChange.func = function (args) {
  return shortPoll({
    getLatest: function (latest) {
      return getBlurb({ userId: args.userId })
        .then(function (blurb) {
          const given = [];
          if (blurb !== latest) {
            latest = blurb;
            given.push(blurb);
          }

          return {
            latest,
            data: given
          }
        })
    },
    delay: 'onBlurbChange'
  })
};

var searchUsers$1 = {};

// Includes
const getPageResults = getPageResults$f.func;

// Args
searchUsers$1.required = ['keyword'];
searchUsers$1.optional = ['limit', 'cursor', 'jar'];

// Docs
/**
 * ✅ Gets a list of users matching the keyword
 * @category User
 * @alias searchUsers
 * @param {string} keyword - The search term to use
 * @param {10 | 25 | 50 | 100} limit - The maximum number of matching users to return
 * @param {string} cursor - The cursor to use when fetching the next or previous page
 * @returns {Promise<UserSearchResult[]>}
 * @example const noblox = require("noblox.js")
 * noblox.searchUsers("bob", 10, "cursorstring")
**/

// Define
function searchUsers (jar, keyword, limit, cursor) {
  return getPageResults({
    url: '//users.roblox.com/v1/users/search',
    jar,
    limit,
    pageCursor: cursor,
    query: {
      keyword
    }
  })
}

searchUsers$1.func = function (args) {
  return searchUsers(
    args.jar,
    args.keyword,
    args.limit ?? 10,
    args.cursor
  )
};

var clearSession = {};

// Includes
const settings$1 = require$$196;

// Args
clearSession.required = ['jar'];

// Docs
/**
 * 🔐 Remove .ROBLOSECURITY cookie from jar.
 * @category Utility
 * @alias clearSession
 * @param {CookieJar} jar - The CookieJar containing the .ROBLOSECURITY cookie.
 * @returns {Promise<string>}
 * @example const noblox = require("noblox.js")
 * noblox.clearSession()
**/

// Define
clearSession.func = function (args) {
  const jar = args.jar;
  if (settings$1.session_only) {
    jar.session = '';
  } else {
    const cookies = jar._jar.store.idx['roblox.com'];
    if (cookies) {
      const cookie = cookies['/'];
      if (cookie && cookie['.ROBLOSECURITY']) {
        delete cookies['/']['.ROBLOSECURITY'];
      }
    }
  }
};

var generalRequest = {};

// Includes
const http = http$1_.func;
const getVerification = getVerification$3.func;

// Args
generalRequest.required = ['url', 'events'];
generalRequest.optional = ['http', 'ignoreCache', 'getBody', 'jar'];

// Docs
/**
 * 🔐 Get the verification inputs and send a request.
 * @category Utility
 * @alias generalRequest
 * @param {string} url - The url to post to.
 * @param {object} events - Form data to send with the request.
 * @param {boolean=} [ignoreCache=false] - Whether to ignore the cache or not.
 * @param {boolean=} [getBody=false] - Whether to return the original body before the POST request.
 * @param {CookieJar=} jar - The CookieJar containing the .ROBLOSECURITY cookie.
 * @returns {Promise<Object>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie.
 * noblox.generalRequest("//www.roblox.com/Groups/Group.aspx?gid=1", { __EVENTTARGET: 'JoinGroupDiv', __EVENTARGUMENT: 'Click' })
**/

// Define
function general (jar, url, inputs, events, customOpt, body) {
  for (const input in events) {
    inputs[input] = events[input];
  }
  const httpOpt = {
    url,
    options: {
      resolveWithFullResponse: true,
      method: 'POST',
      form: inputs,
      jar
    }
  };
  if (customOpt) {
    if (customOpt.url) {
      delete customOpt.url;
    }
    Object.assign(httpOpt.options, customOpt);
  }
  return http(httpOpt).then(function (res) {
    return {
      res,
      body
    }
  })
}

generalRequest.func = function (args) {
  const jar = args.jar;
  const url = args.url;
  const custom = args.http;
  return getVerification({ url: custom ? (custom.url || url) : url, jar, ignoreCache: args.ignoreCache, getBody: args.getBody })
    .then(function (response) {
      return general(jar, url, response.inputs, args.events, args.http, response.body)
    })
};

var getAction = {};

// Args
getAction.required = ['row'];

// Define
const regex = [
  /rank from (.+) to (.+)\.$/,
  /deleted post "(.+)" by user .+\.$/,
  /changed the group status to: (.*)$/
];
// This is no longer used within the library and is maintained only for the purposes of backwards compatibility
// TODO: Remove this in next Semver major version

// Docs
/**
 * ✅ Get the action row for the audit log text. Supported: change rank, delete post, change group status.
 * @category Utility
 * @alias getAction
 * @deprecated
 * @param {string} row - The audit log action row.
 * @returns {AuditItem}
**/

getAction.func = function (args) {
  const row = args.row;
  const text = row.text();
  const params = [];
  for (let i = 0; i < regex.length; i++) {
    const match = text.match(regex[i]);
    if (match) {
      for (let j = 1; j < match.length; j++) {
        params.push(match[j]);
      }
    }
  }
  const target = row.find('a').last().attr('href');
  let found = target.match(/\?ID=(\d+)$/);
  if (!found) {
    found = target.match(/^games\/(\d+)\//);
  }
  found = found && parseInt(found[1], 10);
  return {
    target: found,
    params
  }
};

var getInputs = {};

// Dependencies
const parser = require$$0$3;

// Args
getInputs.required = ['html'];
getInputs.optional = ['find'];

// Docs
/**
 * ✅ Get verification inputs on a page.
 * @category Utility
 * @alias getInputs
 * @param {string} html - The html to get the inputs from.
 * @param {Array<string>=} find - The inputs to find on the page
 * @returns {Inputs}
 * @example const noblox = require("noblox.js")
 * const inputs = noblox.getInputs("htmlhere")
**/

// Define
getInputs.func = function (args) {
  const $ = parser.load(args.html);
  const inputs = {};
  const find = args.find;
  if (find) {
    for (let i = 0; i < find.length; i++) {
      const get = find[i];
      inputs[get] = $('input[name=' + get + ']').val();
    }
  } else {
    $('input[name]').each(function (index, element) {
      const here = $(this);
      inputs[here.attr('name')] = here.val();
    });
  }
  return inputs
};

var refreshCookie = {exports: {}};

(function (module, exports$1) {
	// Includes
	const options = options$6;
	const getGeneralToken = getGeneralToken$P.func;
	const http = http$1_.func;
	// Args
	exports$1.required = [];
	exports$1.optional = ['cookie'];

	// Docs
	/**
	 * 🔐 Refreshes the stored cookie, stores it, and returns it.
	 * @category Utility
	 * @deprecated [Retrieving your .ROBLOSECURITY cookie in incognito mode should make a cookie that does not expire.]{@link https://noblox.js.org/tutorial-Authentication.html}
	 * @alias refreshCookie
	 * @param {string=} cookie - The cookie to refresh.
	 * @returns {Promise<string>}
	 * @example const noblox = require("noblox.js")
	 * const newCookie = await noblox.refreshCookie("COOKIEHERE")
	**/

	// Refreshes the internally stored cookie, or the cookie provided
	// Stores the new cookie & returns it
	function refreshCookie (cookie) {
	  if (cookie) {
	    options.jar.session = cookie;
	  }

	  return getGeneralToken({}).then((token) => {
	    return http({
	      url: 'https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate',
	      options: {
	        method: 'POST',
	        resolveWithFullResponse: true,
	        jar: null,
	        headers: {
	          'X-CSRF-TOKEN': token
	        }
	      }
	    }).then((res) => {
	      const cookies = res.headers['set-cookie'];
	      if (cookies) {
	        const cookie = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
	        options.jar.session = cookie;
	        return cookie
	      } else {
	        throw new Error('Failed to refresh cookie: None returned.')
	      }
	    })
	  })
	}

	module.exports = refreshCookie; 
} (refreshCookie, refreshCookie.exports));

var refreshCookieExports = refreshCookie.exports;

var relog = {exports: {}};

const require$$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(fs);

var hasRequiredRelog;

function requireRelog () {
	if (hasRequiredRelog) return relog.exports;
	hasRequiredRelog = 1;
	(function (module, exports$1) {
		// Includes
		const options = options$6;
		const getGeneralToken = getGeneralToken$P.func;
		const getVerification = getVerification$3.func;
		const getCurrentUser = /*@__PURE__*/ requireGetCurrentUser().func;
		const http = http$1_.func;
		const cookieFile = './cookie';
		const fs = require$$5;
		// Args
		exports$1.required = ['cookie'];
		exports$1.optional = [];

		const day = 86400000;

		// Define
		const relog = (cookie) => {
		  if (!cookie) throw new Error('no cookie supplied?')
		  options.jar.session = cookie;
		  return getVerification({ url: 'https://www.roblox.com/my/account#!/security' })
		    .then((ver) => {
		      if (!ver.header) console.log('Bad cookie.');
		      return getGeneralToken({}).then((token) => {
		        return http({
		          url: 'https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate',
		          options: {
		            method: 'POST',
		            resolveWithFullResponse: true,
		            verification: ver.header,
		            jar: null,
		            headers: {
		              'X-CSRF-TOKEN': token
		            },
		            form: {
		              __RequestVerificationToken: ver.inputs.__RequestVerificationToken
		            }
		          }
		        }).then((res) => {
		          const cookies = res.headers['set-cookie'];
		          if (cookies) {
		            options.jar.session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];

		            fs.writeFile(cookieFile, JSON.stringify({ cookie: options.jar.session, time: Date.now() }), (err) => {
		              if (err) {
		                console.error('Failed to write cookie');
		              }
		              return true
		            });
		          }
		        })
		      })
		    })
		};
		module.exports = c;

		async function c (cookie) {
		  // Check for file
		  if (fs.existsSync(cookieFile)) {
		    const json = JSON.parse(fs.readFileSync(cookieFile));

		    // Check its new enough
		    if (json.time + day > Date.now()) {
		      // Its recent enough. Try it.
		      try {
		        await relog(json.cookie);
		        return getCurrentUser({})
		      } catch (e) {
		        console.log('Stored relog failed. Trying with given.');
		      }
		    }
		  }
		  if (cookie) {
		    // Try the user's cookie
		    try {
		      await relog(cookie);
		      return getCurrentUser({})
		    } catch (e) {
		      console.error(e);
		    }
		  }
		  throw new Error('No cookie supplied and no cookie file available.')
		} 
	} (relog, relog.exports));
	return relog.exports;
}

var setOptions$1 = {};

const settings = require$$196;

// Docs
/**
 * ✅ Updates library options. This allows you to modify settings such as time-out, or number of event retries without
 * altering the settings.json file. Objects passed to this function should match the format of the settings.json file.
 * Unknown keys, or malformed options will be rejected with an error.
 * @category Utility
 * @param {Partial<NobloxOptions>} newOptions - The new options to set, structured as per [settings.json](https://github.com/noblox/noblox.js/blob/master/settings.json)
 * @returns void
 * @see [settings.json](https://github.com/noblox/noblox.js/blob/master/settings.json) - default package settings
 * @example const noblox = require("noblox.js")
 * // This example overrides getPlayerThumbnail()'s response URL when a thumbnail is moderated.
 * // You usually want to run this before logging in with your cookie.
 * noblox.setOptions({
 *  thumbnail: {
 *    failedUrl: {
 *      blocked: "https://raw.githubusercontent.com/noblox/noblox.js/master/img/noblox-js.png"
 *    }
 *  }
 * })
 */
function setOptions (newOptions) {
  return setOptionsLevel(settings, newOptions)
}

// This function allows key validation to be performed at different "levels" of nesting.
// Ensures the provided keys already exist, and discards invalid keys.
function setOptionsLevel (settingsLevel, inputObj) {
  const keys = Object.keys(inputObj);

  for (const key of keys) {
    const newValue = inputObj[key];
    const currentValue = settingsLevel[key];

    if (currentValue !== undefined) {
      if (typeof currentValue === 'object') {
        if (typeof inputObj[key] !== 'object') {
          throw new Error(`Tried to set options key ${key}, an object, to a non-object value: ${newValue}`)
        }

        setOptionsLevel(currentValue, newValue);
      } else {
        // it's not undefined, and it's not a nested object - set the value.
        settingsLevel[key] = newValue;
      }
    } else {
      // The key doesn't exist
      throw new Error(`Tried to set option "${key}". This option does not exist, or has been nested incorrectly.`)
    }
  }
}

setOptions$1.func = setOptions;

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib.exports;
	hasRequiredLib = 1;
	(function (module, exports$1) {
		const noblox = {};

		noblox.getUserSocialLinks = getUserSocialLinks$1;
		noblox.block = block$1;
		noblox.unblock = unblock$1;
		noblox.deleteFromInventory = deleteFromInventory$1;
		noblox.getGamePassProductInfo = getGamePassProductInfo$1;
		noblox.getProductInfo = getProductInfo$2;
		noblox.uploadAnimation = uploadAnimation;
		noblox.uploadItem = uploadItem$1;
		noblox.uploadModel = uploadModel;
		noblox.avatarRules = avatarRules;
		noblox.currentlyWearing = currentlyWearing;
		noblox.getAvatar = getAvatar$1;
		noblox.getCurrentAvatar = getCurrentAvatar;
		noblox.getRecentItems = getRecentItems;
		noblox.outfitDetails = outfitDetails;
		noblox.outfits = outfits;
		noblox.redrawAvatar = redrawAvatar$1;
		noblox.removeAssetId = removeAssetId$1;
		noblox.setAvatarBodyColors = setAvatarBodyColors;
		noblox.setAvatarScales = setAvatarScales;
		noblox.setPlayerAvatarType = setPlayerAvatarType;
		noblox.setWearingAssets = setWearingAssets;
		noblox.wearAssetId = wearAssetId$1;
		noblox.getAwardedTimestamps = getAwardedTimestamps$1;
		noblox.getBadgeInfo = getBadgeInfo;
		noblox.getGameBadges = getGameBadges;
		noblox.getPlayerBadges = getPlayerBadges;
		noblox.updateBadgeInfo = updateBadgeInfo;
		noblox.addUsersToConversation = addUsersToConversation$1;
		noblox.chatSettings = chatSettings;
		noblox.getChatMessages = getChatMessages;
		noblox.getConversations = getConversations;
		noblox.getRolloutSettings = getRolloutSettings;
		noblox.getUnreadConversationCount = getUnreadConversationCount;
		noblox.getUnreadMessages = getUnreadMessages;
		noblox.getUserConversations = getUserConversations;
		noblox.markChatAsRead = markChatAsRead;
		noblox.markChatAsSeen = markChatAsSeen;
		noblox.multiGetLatestMessages = multiGetLatestMessages;
		noblox.onNewConversation = onNewConversation;
		noblox.onNewMessage = onNewMessage;
		noblox.onNewMessageBySelf = onNewMessageBySelf;
		noblox.onUserOnline = onUserOnline;
		noblox.onUserTyping = onUserTyping;
		noblox.removeFromGroupConversation = removeFromGroupConversation$1;
		noblox.renameGroupConversation = renameGroupConversation$1;
		noblox.sendChatMessage = sendChatMessage$1;
		noblox.setChatUserTyping = setChatUserTyping$1;
		noblox.start121Conversation = start121Conversation;
		noblox.startCloudEditConversation = startCloudEditConversation;
		noblox.startGroupConversation = startGroupConversation$1;
		noblox.onNotification = onNotification$f;
		noblox.setAPIKey = setAPIKey;
		noblox.setCookie = setCookie;
		noblox.deleteDatastoreEntry = deleteDatastoreEntry$1;
		noblox.getDatastoreEntry = getDatastoreEntry$1;
		noblox.getDatastoreEntryVersions = getDatastoreEntryVersions$1;
		noblox.getDatastoreKeys = getDatastoreKeys$1;
		noblox.getDatastores = getDatastores$1;
		noblox.incrementDatastoreEntry = incrementDatastoreEntry$1;
		noblox.setDatastoreEntry = setDatastoreEntry$1;
		noblox.canManage = canManage$1;
		noblox.configureItem = configureItem$1;
		noblox.updateUniverse = updateUniverse$1;
		noblox.updateUniverseAccess = updateUniverseAccess$1;
		noblox.buy = buy$1;
		noblox.getGroupFunds = getGroupFunds$1;
		noblox.getGroupRevenueSummary = getGroupRevenueSummary$1;
		noblox.getGroupTransactions = getGroupTransactions$1;
		noblox.getResaleData = getResaleData$1;
		noblox.getResellers = getResellers$1;
		noblox.getUserFunds = getUserFunds$1;
		noblox.getUserTransactions = /*@__PURE__*/ requireGetUserTransactions();
		noblox.onGroupTransaction = onGroupTransaction;
		noblox.acceptFriendRequest = acceptFriendRequest$1;
		noblox.declineAllFriendRequests = declineAllFriendRequests$1;
		noblox.declineFriendRequest = declineFriendRequest$1;
		noblox.getFollowerCount = getFollowerCount$1;
		noblox.getFollowers = getFollowers$1;
		noblox.getFollowingCount = getFollowingCount$1;
		noblox.getFollowings = getFollowings$1;
		noblox.getFriendCount = getFriendCount$2;
		noblox.getFriendRequests = getFriendRequests;
		noblox.getFriends = getFriends$1;
		noblox.onFriendRequest = onFriendRequest;
		noblox.removeFriend = removeFriend$1;
		noblox.sendFriendRequest = sendFriendRequest$1;
		noblox.unfollow = unfollow$1;
		noblox.addDeveloperProduct = addDeveloperProduct;
		noblox.configureGamePass = configureGamePass$1;
		noblox.getDeveloperProducts = getDeveloperProducts$1;
		noblox.getGameInstances = getGameInstances;
		noblox.getGamePasses = getGamePasses$1;
		noblox.getGameRevenue = getGameRevenue$1;
		noblox.getGameSocialLinks = getGameSocialLinks$1;
		noblox.getGroupGames = getGroupGames;
		noblox.getPlaceInfo = getPlaceInfo$1;
		noblox.getUniverseInfo = getUniverseInfo$1;
		noblox.publishToTopic = publishToTopic$1;
		noblox.updateDeveloperProduct = updateDeveloperProduct$1;
		noblox.changeRank = changeRank$2;
		noblox.deleteWallPost = deleteWallPost$1;
		noblox.deleteWallPostsByUser = deleteWallPostsByUser$1;
		noblox.demote = demote;
		noblox.exile = exile;
		noblox.getAuditLog = getAuditLog$2;
		noblox.getGroup = getGroup$1;
		noblox.getGroupSocialLinks = getGroupSocialLinks$1;
		noblox.getGroups = getGroups$1;
		noblox.getJoinRequest = getJoinRequest$1;
		noblox.getJoinRequests = getJoinRequests$3;
		noblox.getPlayers = getPlayers;
		noblox.getRankInGroup = getRankInGroup$1;
		noblox.getRankNameInGroup = getRankNameInGroup$2;
		noblox.getRole = getRole$3;
		noblox.getRolePermissions = getRolePermissions$1;
		noblox.getRoles = getRoles$3;
		noblox.getShout = getShout$2;
		noblox.getWall = getWall$1;
		noblox.groupPayout = groupPayout$1;
		noblox.handleJoinRequest = handleJoinRequest$2;
		noblox.leaveGroup = /*@__PURE__*/ requireLeaveGroup();
		noblox.onAuditLog = onAuditLog;
		noblox.onJoinRequest = onJoinRequest;
		noblox.onJoinRequestHandle = onJoinRequestHandle;
		noblox.onShout = onShout;
		noblox.onWallPost = onWallPost;
		noblox.promote = promote;
		noblox.searchGroups = searchGroups;
		noblox.setGroupDescription = setGroupDescription;
		noblox.setGroupName = setGroupName;
		noblox.setRank = setRank$2;
		noblox.setRoleInfo = setRoleInfo$1;
		noblox.shout = shout;
		noblox.index = /*@__PURE__*/ requireLib();
		noblox.levelOneCopy = levelOneCopy$2;
		noblox.queue = queue;
		noblox.timeout = timeout_1;
		noblox.wrap = wrap;
		noblox.getCollectibles = getCollectibles$1;
		noblox.getInventory = getInventory;
		noblox.getInventoryById = getInventoryById;
		noblox.getOwnership = getOwnership$1;
		noblox.getUAIDs = getUAIDs$1;
		noblox.getGroupAssets = getGroupAssets;
		noblox.options = options$6;
		noblox.onPartyDeleted = onPartyDeleted;
		noblox.onPartyInvite = onPartyInvite;
		noblox.onPartyJoinedGame = onPartyJoinedGame;
		noblox.onPartyLeftGame = onPartyLeftGame;
		noblox.onPartySelfJoined = onPartySelfJoined;
		noblox.onPartySelfLeft = onPartySelfLeft;
		noblox.onPartyUserJoined = onPartyUserJoined;
		noblox.onPartyUserLeft = onPartyUserLeft;
		noblox.getPremium = getPremium$1;
		noblox.getPresences = getPresences$1;
		noblox.getMessages = getMessages$2;
		noblox.message = /*@__PURE__*/ requireMessage();
		noblox.onMessage = onMessage;
		noblox.getLogo = getLogo$1;
		noblox.getPlayerThumbnail = getPlayerThumbnail$1;
		noblox.getThumbnails = getThumbnails$1;
		noblox.acceptTrade = acceptTrade$1;
		noblox.canTradeWith = canTradeWith$1;
		noblox.counterTrade = /*@__PURE__*/ requireCounterTrade();
		noblox.declineTrade = declineTrade$1;
		noblox.getTradeInfo = getTradeInfo$1;
		noblox.getTrades = getTrades;
		noblox.sendTrade = /*@__PURE__*/ requireSendTrade();
		noblox.getBlurb = getBlurb$1;
		noblox.getIdFromUsername = getIdFromUsername$1;
		noblox.getPlayerInfo = getPlayerInfo$1;
		noblox.getUserInfo = getUserInfo$1;
		noblox.getUsernameFromId = getUsernameFromId$1;
		noblox.getUsernameHistory = getUsernameHistory$1;
		noblox.onBlurbChange = onBlurbChange;
		noblox.searchUsers = searchUsers$1;
		noblox.clearSession = clearSession;
		noblox.generalRequest = generalRequest;
		noblox.getAction = getAction;
		noblox.getAuthenticatedUser = getAuthenticatedUser$1;
		noblox.getCurrentUser = /*@__PURE__*/ requireGetCurrentUser();
		noblox.getGeneralToken = getGeneralToken$P;
		noblox.getHash = getHash$2;
		noblox.getInputs = getInputs;
		noblox.getPageResults = getPageResults$f;
		noblox.getSenderUserId = /*@__PURE__*/ requireGetSenderUserId();
		noblox.getSession = getSession$2;
		noblox.getVerification = getVerification$3;
		noblox.getVerificationInputs = getVerificationInputs$1;
		noblox.http = http$1_;
		noblox.jar = jar;
		noblox.refreshCookie = refreshCookieExports;
		noblox.relog = /*@__PURE__*/ requireRelog();
		noblox.setOptions = setOptions$1;
		noblox.shortPoll = shortPoll$7;

		for (const name in noblox) {
		  const exporter = noblox[name];
		  if (Object.prototype.hasOwnProperty.call(exporter, 'func')) {
		    module.exports[name] = noblox.wrap.wrapExport(exporter.func, exporter.required || [], exporter.optional || []);
		  } else {
		    module.exports[name] = noblox[name];
		  }
		}

		exports$1.options = options$6;
		exports$1.settings = require$$196; 
	} (lib, lib.exports));
	return lib.exports;
}

var libExports = /*@__PURE__*/ requireLib();
const noblox = /*@__PURE__*/getDefaultExportFromCjs(libExports);

const trelloBoards = {
  severeBans: ["1sH1ZM3A", "1OQj0CTk"],
  minorBans: ["BtAXade2", "2w4zaqFS"],
  departmentBlacklists: [],
  warrantDatabase: ["exfhKJtm"]
};
const boardListNames = {
  "BtAXade2": "Blacklisted",
  "2w4zaqFS": "Bank Bans",
  "exfhKJtm": "AoS Players",
  "1sH1ZM3A": "Capitol Banned",
  "1OQj0CTk": "Prison Bans"
};
function getTrelloConfig() {
  const key = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;
  return { key, token };
}
async function getBoardName(boardId, key, token) {
  const url = `https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`;
  const response = await axios.get(url);
  return response.data.name;
}
async function getBoardLists(boardId, key, token) {
  const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`;
  const response = await axios.get(url);
  return response.data;
}
async function getBoardCards(boardId, key, token) {
  const lists = await getBoardLists(boardId, key, token);
  const targetListName = boardListNames[boardId];
  const targetList = lists.find((list) => list.name === targetListName);
  if (!targetList) {
    return [];
  }
  const url = `https://api.trello.com/1/lists/${targetList.id}/cards?key=${key}&token=${token}`;
  const response = await axios.get(url);
  return response.data;
}
async function checkBoardCategory(username, boards, key, token) {
  var _a;
  const results = [];
  for (const boardId of boards) {
    try {
      const boardName = await getBoardName(boardId, key, token);
      const cards = await getBoardCards(boardId, key, token);
      const matches = cards.filter((card) => {
        var _a2;
        const cardUsername = (_a2 = card.name) == null ? void 0 : _a2.split(":")[0];
        return (cardUsername == null ? void 0 : cardUsername.toLowerCase()) === username.toLowerCase();
      });
      const listName = boardListNames[boardId] || "Unknown List";
      results.push(...matches.map((card) => ({
        board: boardId,
        card: card.name,
        list: listName,
        url: card.url,
        description: card.desc
      })));
    } catch (error) {
      console.error(`Error accessing board ${boardId}:`, ((_a = error.response) == null ? void 0 : _a.statusText) || error.message);
    }
  }
  return results;
}
async function checkTrelloBoards(username) {
  const { key, token } = getTrelloConfig();
  if (!key || !token) {
    console.error("Missing Trello credentials");
    return {
      hasSevereBans: false,
      hasMinorBans: false,
      hasBlacklists: false,
      hasWarrants: false,
      severeBans: [],
      minorBans: [],
      blacklists: [],
      warrants: []
    };
  }
  const [severeBans, minorBans, blacklists, warrants] = await Promise.all([
    checkBoardCategory(username, trelloBoards.severeBans, key, token),
    checkBoardCategory(username, trelloBoards.minorBans, key, token),
    checkBoardCategory(username, trelloBoards.departmentBlacklists, key, token),
    checkBoardCategory(username, trelloBoards.warrantDatabase, key, token)
  ]);
  return {
    hasSevereBans: severeBans.length > 0,
    hasMinorBans: minorBans.length > 0,
    hasBlacklists: blacklists.length > 0,
    hasWarrants: warrants.length > 0,
    severeBans,
    minorBans,
    blacklists,
    warrants
  };
}

const bannedGroups = {
  severeBans: [],
  minorBans: [],
  limitedGroups: [
    3130067,
    3842918,
    761943,
    905999,
    816616,
    759572,
    766074,
    761141,
    977773,
    761706,
    2900057,
    792297,
    761515,
    860594,
    1252274,
    845643
  ],
  limitedRanks: [],
  excludedRanks: [
    "Suspended",
    "Vice President",
    "President",
    "Community Oversight",
    "Founder",
    "Protectee",
    "American Online",
    "Agency Oversight",
    "Foreign Leader",
    "Department Oversight",
    "Representative",
    "Oversight Staff",
    "Business Owners"
  ]
};
async function checkGroupBans(groups) {
  const results = {
    hasSevereBans: false,
    hasMinorBans: false,
    tooManyGroups: false,
    hasLimitedRanks: false,
    severeBanGroups: [],
    minorBanGroups: [],
    limitedGroupCount: 0,
    limitedGroups: [],
    limitedRankGroups: []
  };
  for (const group of groups) {
    if (bannedGroups.severeBans.includes(group.Id)) {
      results.hasSevereBans = true;
      results.severeBanGroups.push({
        group_id: group.Id,
        group_name: group.Name,
        role: group.Role
      });
    }
    if (bannedGroups.minorBans.includes(group.Id)) {
      results.hasMinorBans = true;
      results.minorBanGroups.push({
        group_id: group.Id,
        group_name: group.Name,
        role: group.Role
      });
    }
    if (bannedGroups.limitedGroups.includes(group.Id)) {
      if (!bannedGroups.excludedRanks.includes(group.Role)) {
        results.limitedGroups.push({
          group_id: group.Id,
          group_name: group.Name,
          role: group.Role
        });
      }
      if (bannedGroups.limitedRanks.includes(group.Role)) {
        results.hasLimitedRanks = true;
        results.limitedRankGroups.push({
          group_id: group.Id,
          group_name: group.Name,
          role: group.Role
        });
      }
    }
  }
  results.limitedGroupCount = results.limitedGroups.length;
  results.tooManyGroups = results.limitedGroupCount > 3;
  return results;
}

async function getFriendCount(userId) {
  try {
    const url = `https://friends.roblox.com/v1/users/${userId}/friends/count`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch friend count");
    }
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Friend count error:", error);
    return null;
  }
}
const robloxcheck_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const query = getQuery(event);
  const username = query.username;
  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Username is required"
    });
  }
  if (typeof username !== "string" || username.length < 3 || !/^[a-zA-Z0-9_ ]+$/.test(username)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid username format"
    });
  }
  try {
    const userId = await noblox.getIdFromUsername(username).catch(() => {
      throw new Error("User not found");
    });
    const [userInfo, friendsCount, badges, groups] = await Promise.all([
      noblox.getPlayerInfo(userId),
      getFriendCount(userId),
      noblox.getPlayerBadges(userId, 100).catch(() => []),
      noblox.getGroups(userId)
    ]);
    let groupBanResults;
    try {
      groupBanResults = await checkGroupBans(groups);
    } catch (err) {
      console.error("Group ban check error:", err);
      groupBanResults = {
        severeBanGroups: [],
        minorBanGroups: [],
        hasSevereBans: false,
        hasMinorBans: false,
        tooManyGroups: false,
        hasLimitedRanks: false,
        limitedGroups: [],
        limitedGroupCount: 0,
        limitedRankGroups: []
      };
    }
    const nusaGroup = groups.find((g) => g.Id === 758071) || null;
    const nusaRank = nusaGroup ? await noblox.getRankInGroup(758071, userId).catch(() => null) : null;
    const isFederalPrisoner = (nusaGroup == null ? void 0 : nusaGroup.Role) === "Federal Prisoner";
    const trelloResults = await checkTrelloBoards(userInfo.username).catch((error) => {
      console.error("Trello check error:", error);
      return {
        hasSevereBans: false,
        hasMinorBans: false,
        hasBans: false,
        hasBlacklists: false,
        hasWarrants: false,
        severeBans: [],
        minorBans: [],
        bans: [],
        blacklists: [],
        warrants: []
      };
    });
    return {
      id: userId,
      name: userInfo.username,
      display_name: userInfo.displayName,
      created: userInfo.joinDate,
      description: userInfo.blurb,
      is_banned: userInfo.isBanned,
      friends_count: friendsCount,
      badges_count: badges.length,
      groups: groups.map((g) => ({
        group_name: g.Name,
        role_name: g.Role
      })),
      nusa_info: nusaGroup ? {
        rank: nusaRank,
        role: nusaGroup.Role
      } : null,
      federal_prisoner: isFederalPrisoner,
      trello_checks: {
        property_bans: [...trelloResults.severeBans || [], ...trelloResults.minorBans || []],
        department_blacklists: trelloResults.blacklists || [],
        warrants: trelloResults.warrants || [],
        has_bans: (((_a = trelloResults.severeBans) == null ? void 0 : _a.length) || 0) > 0 || (((_b = trelloResults.minorBans) == null ? void 0 : _b.length) || 0) > 0,
        has_blacklists: (((_c = trelloResults.blacklists) == null ? void 0 : _c.length) || 0) > 0,
        has_warrants: (((_d = trelloResults.warrants) == null ? void 0 : _d.length) || 0) > 0,
        hasSevereBans: trelloResults.hasSevereBans,
        hasMinorBans: trelloResults.hasMinorBans
      },
      group_bans: {
        severe_bans: groupBanResults.severeBanGroups,
        minor_bans: groupBanResults.minorBanGroups,
        has_severe_bans: groupBanResults.hasSevereBans,
        has_minor_bans: groupBanResults.hasMinorBans,
        tooManyGroups: groupBanResults.tooManyGroups,
        hasLimitedRanks: groupBanResults.hasLimitedRanks,
        limitedGroupCount: groupBanResults.limitedGroupCount
      }
    };
  } catch (error) {
    console.error("Roblox check error:", error);
    const statusCode = error.message === "User not found" ? 404 : 500;
    throw createError({
      statusCode,
      statusMessage: statusCode === 404 ? "Not Found" : "Internal Server Error",
      message: error.message || "Failed to check user"
    });
  }
});

export { robloxcheck_get as default };
//# sourceMappingURL=robloxcheck.get.mjs.map
