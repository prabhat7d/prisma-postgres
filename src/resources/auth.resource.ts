export class AuthResource {
  static make(result: {
    token: string;
    tokenType: string;
    expiresIn: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }) {
    return {
      data: {
        token: result.token,
        tokenType: result.tokenType,
        expiresIn: result.expiresIn,
        user: result.user,
      },
    };
  }
}