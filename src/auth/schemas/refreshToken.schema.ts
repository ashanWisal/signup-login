import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema({timestamps: true })
export class RefershToken extends Document {
    @Prop({ required: true })
    token: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    expiryDate: Date

}

export const refreshTokenSchema = SchemaFactory.createForClass(RefershToken)