export interface BetterRequest<Headers, Body, Query, Params>
  extends Express.Request {
  headers: Headers;
  body: Body;
  query: Query;
  params: Params;
}
