import passport from "passport";
import passportJwt from "passport-jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
    /** IF BEARER TOKEN
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    **/
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
    secretOrKey: process.env.TOKEN_SECRET
};

passport.use('jwt', new JwtStrategy(opts, async function (jwtToken, done) {
    if (jwtToken.deviceId !== undefined) {
        var _device = await globalThis.__mySqlConn.db.Devices.model.findOne({
            where: {
                deviceId: jwtToken.deviceId,
                deviceName: jwtToken.deviceName
            }
        });
        if (!_device) {
            return done(null, false, { message: 'Unauthorized. Not found.' });
        }
        var expirationDate = new Date(jwtToken.exp * 1000);
        if (expirationDate < new Date()) {
            return done(null, false, { message: "Unauthorized. Token expired." });
        }
        return done(null, true, _device.dataValues);
    } else if (jwtToken.userId !== undefined) {
        var _user = await globalThis.__mySqlConn.db.Users.model.findOne({
            where: {
                userId: jwtToken.userId
            }
        });
        if (!_user) {
            return done(null, false, { message: "Unauthorized. Not found." });
        }
        var expirationDate = new Date(jwtToken.exp * 1000);
        if (expirationDate < new Date()) {
            return done(null, false, { message: "Unauthorized. Token expired." });
        }
        return done(null, true, _user.dataValues);
    } else {
        return done(null, false, { message: "Unauthorized. Invalid Token." });
    }
}));