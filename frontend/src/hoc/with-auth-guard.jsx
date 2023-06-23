import AuthGuardWrap from "../guards/AuthGuardWrap";

export const WithAuthGuard = (Component) => (props) => (
  <AuthGuardWrap>
    <Component {...props} />
  </AuthGuardWrap>
);
