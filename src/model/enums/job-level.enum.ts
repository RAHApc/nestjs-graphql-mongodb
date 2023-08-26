import { registerEnumType } from "@nestjs/graphql";

export enum Level{
    Level1="level1",
    Level2="level2"
}

registerEnumType(Level,{
    name:"Level",
    description:"Level of title"
})