import React from "react";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const [searchParams, setSearchParams] = useSearchParams({});
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ setSearchParams, searchParams, location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
