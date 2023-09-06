import { Model } from "mongoose";
import { SessionDocument } from "./session.interface";
import SessionModel from "./session.model";

class SessionService {
    private session: Model<SessionDocument> = SessionModel;

    public async createSession(userId: string, userAgent: string) {
        try {
            const session = await this.session.create({ user: userId, userAgent });
            return session;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default SessionService;
