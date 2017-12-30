//@Flow
import AuthenticationService from '../services/authentication.service';

exports.register = (req: any, res: any): void => {
    AuthenticationService.register(req.body, 'Client').then((user) => {
        res.send({
            success: true,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
}

exports.registerAdmin = (req: any, res: any): void => {
    AuthenticationService.register(req.body, 'Admin').then((user) => {
        res.send({
            success: true,
            user: user
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
}

exports.authenticate = (req: any, res: any): void => {
    AuthenticationService.authenticate(req.body.mail, req.body.password).then((token) => {
        res.send({
            success: true,
            token: token
        });
    }).catch((err) => {
        res.send({
            success: false,
            errors: err
        });
    });
};