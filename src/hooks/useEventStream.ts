import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useReducer } from 'react';
import { fetchEvents } from '../lib/api';
import { applyEventBatch, emptyEventState, summarizeEvents } from '../lib/events';

export function useEventStream() {
  const [state, dispatch] = useReducer(applyEventBatch, undefined, emptyEventState);
  const query = useQuery({ queryKey: ['events', state.cursor], queryFn: () => fetchEvents(state.cursor), enabled: false });
  const load = useCallback(async () => { const result = await query.refetch(); if (result.data) dispatch(result.data); }, [query]);
  const summary = useMemo(() => summarizeEvents(state), [state]);
  return { state, summary, load, loading: query.isFetching };
}
