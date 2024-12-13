import jwt from "jsonwebtoken";
import config from "@/config";

type GenerateOptions = {
  payload: string | object | Buffer;
  tokenType: "access" | "refresh" | "passwordReset";
};

type VerifyOptions = {
  token: string;
  tokenType: GenerateOptions["tokenType"];
};

function selectFunc(tokenType: GenerateOptions["tokenType"]) {
  if (tokenType === "refresh") {
    return {
      secret: config.jwt.refresh.secret,
      expiresIn: config.jwt.refresh.expiresIn,
    };
  }
  return {
    secret: config.jwt.access.secret,
    expiresIn: config.jwt.access.expiresIn,
  };
}

function generate({ payload, tokenType }: GenerateOptions): string {
  const { expiresIn, secret } = selectFunc(tokenType);

  return jwt.sign(payload, secret, {
    expiresIn,
    subject: tokenType,
  });
}

function verify({ token, tokenType }: VerifyOptions): string | jwt.JwtPayload {
  const { secret } = selectFunc(tokenType);

  return jwt.verify(token, secret, {
    subject: tokenType,
  });
}

const decode = (token: string) => {
  return jwt.decode(token);
};

export default {
  verify,
  generate,
  decode,
};
