import { create, getNumericDate, verify } from "@x/djwt";

export interface TokenPayload {
  userId: number;
  exp: number;
}

const AUTH_TOKEN_TTL: number = 3600; // 1 hour
const REFRESH_TOKEN_TTL: number = 2592000; // 30 days

const SECRET_KEY_FORMAT = "jwk";
const SECRET_KEY_FILE_PATH = "./data/auth/jwk.json";
const SECRET_KEY_ALGO: { name: string; hash: string } = {
  name: "HMAC",
  hash: "SHA-512",
};
const SECRET_KEY_USAGES: KeyUsage[] = ["sign", "verify"];

export const getSecretKey = async (): Promise<CryptoKey> => {
  try {
    // import JWK from file
    const fileContent: string = Deno.readTextFileSync(SECRET_KEY_FILE_PATH);
    const secretKey: JsonWebKey = JSON.parse(fileContent);

    return await crypto.subtle.importKey(
      SECRET_KEY_FORMAT,
      secretKey,
      SECRET_KEY_ALGO,
      false,
      SECRET_KEY_USAGES,
    );
  } catch (_) {
    // file doesn't exist or corrupted — generate secretKey and write to file as JWK
    const secretKey: CryptoKey = (await crypto.subtle.generateKey(
      SECRET_KEY_ALGO,
      true,
      SECRET_KEY_USAGES,
    )) as CryptoKey;
    const exportedKey: JsonWebKey = await crypto.subtle.exportKey(
      SECRET_KEY_FORMAT,
      secretKey,
    );
    const serializedKey: string = JSON.stringify(exportedKey);

    Deno.writeTextFileSync(SECRET_KEY_FILE_PATH, serializedKey);

    return secretKey;
  }
};

// Generate a JWT token for the user (valid for 1 hour)
export const generateJwt = async (userId: number) => {
  return await create(
    { alg: "HS512", typ: "JWT" },
    {
      userId,
      exp: getNumericDate(AUTH_TOKEN_TTL),
    },
    await getSecretKey(),
  );
};

// Generate a refresh token (longer expiration time)
export const generateRefreshToken = async (userId: number) => {
  return await create(
    { alg: "HS512", typ: "JWT" },
    {
      userId,
      exp: getNumericDate(REFRESH_TOKEN_TTL),
    },
    await getSecretKey(),
  );
};

// Verify JWT
export const verifyJwt = async (token: string): Promise<TokenPayload> => {
  const tokenPayload = (await verify(token, await getSecretKey())) as unknown;

  return tokenPayload as TokenPayload;
};
