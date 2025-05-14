import mongoose, { Document } from "mongoose";
export declare class RefershToken extends Document {
    token: string;
    userId: mongoose.Schema.Types.ObjectId;
    expiryDate: Date;
}
export declare const refreshTokenSchema: mongoose.Schema<RefershToken, mongoose.Model<RefershToken, any, any, any, mongoose.Document<unknown, any, RefershToken, any> & RefershToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefershToken, mongoose.Document<unknown, {}, mongoose.FlatRecord<RefershToken>, {}> & mongoose.FlatRecord<RefershToken> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
