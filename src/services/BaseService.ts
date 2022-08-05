import ChildService from "./ChildService";
import OTPService from "./OTPService";
import ParentService from "./ParentService";
import PasswordResetRequestService from "./PasswordResetRequestService";

export default class BaseService {

    parentService(): ParentService {
        return new ParentService();
    }
    passwordResetRequestService(): PasswordResetRequestService {
        return new PasswordResetRequestService();
    }
    otpService(): OTPService {
        return new OTPService();
    }
    childService(): ChildService {
        return new ChildService();
    }
}