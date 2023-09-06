import { FilterQuery, UpdateQuery, Model } from "mongoose";
import { SessionDocument } from "./session.interface";
import SessionModel from "./session.model";
import Service from "../../utils/interfaces/service.interface";

class SessionService implements Service {
    private readonly session: Model<SessionDocument> = SessionModel;

    public async create(userId: string, userAgent: string) {
        try {
            return await this.session.create({ user: userId, userAgent });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async read() {
        try {
            throw new Error("Not implemented");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async update(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
        try {
            return this.session.updateOne(query, update);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async delete() {
        try {
            throw new Error("Not implemented");
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default SessionService;
