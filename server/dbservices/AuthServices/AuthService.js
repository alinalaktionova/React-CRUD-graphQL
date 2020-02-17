const logger = require("../../logger/config");

class AuthService {
  setUserInfo = async (key, value, redis) => {
    try {
      await redis.set(key, JSON.stringify(value));
      return true;
    } catch (e) {
      logger.error(`Failed to set user in redis: ${e.message}`);
      return false;
    }
  };
  logoutUser = async (key, redis) => {
    try {
      await redis.del(key);
      return true;
    } catch (e) {
      logger.error(`Failed to log out: ${e.message}`);
      return false;
    }
  };
}
module.exports = AuthService;
