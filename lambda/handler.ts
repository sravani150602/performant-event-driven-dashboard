import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { generateEvents } from '../src/lib/events.ts';

export const handler: APIGatewayProxyHandlerV2 = async (request) => {
  const cursor = Number(request.queryStringParameters?.cursor ?? 0);
  const requested = Number(request.queryStringParameters?.count ?? 120);
  const count = Math.min(Math.max(requested, 1), 1_000);
  return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }, body: JSON.stringify(generateEvents(count, cursor)) };
};
