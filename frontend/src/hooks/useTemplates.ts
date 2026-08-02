import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TemplatesService } from '../api/generated';
import type { WorkshopLaunchRequest, TemplateStats } from '../api/generated';
import { OpenAPI } from '../api/generated/core/OpenAPI';
import { request as __request } from '../api/generated/core/request';

// Templates are git-managed YAML served read-only by the API (ADR-0006); there
// are no create/update/delete/clone hooks. Edit the files under
// deploy/charts/orchestra/files/templates/ via a pull request.

const TEMPLATES_KEY = ['templates'] as const;

// The catalog page filters, searches and sorts entirely client-side, so it needs
// every template, not the first page. Importing the Bioconductor back catalogue
// took this from 3 templates to 87, past the 50 the single request returned, and
// everything after "E" alphabetically silently vanished from the menu -- which
// included most of the `latest` set.
//
// The API caps `size` at 100, so one bigger request is not a fix either; this
// walks the pages until it has them all.
const PAGE_SIZE = 100; // API maximum

export function useTemplates(includeInactive = false) {
  return useQuery({
    queryKey: [...TEMPLATES_KEY, 'all', includeInactive],
    queryFn: async () => {
      const first = await TemplatesService.listTemplatesTemplatesGet(1, PAGE_SIZE, includeInactive);
      const items = [...(first.items ?? [])];
      const total = first.total ?? items.length;
      for (let page = 2; items.length < total; page++) {
        const next = await TemplatesService.listTemplatesTemplatesGet(page, PAGE_SIZE, includeInactive);
        if (!next.items?.length) break; // defensive: never loop forever
        items.push(...next.items);
      }
      return { ...first, items, total };
    },
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: [...TEMPLATES_KEY, id],
    queryFn: () => TemplatesService.getTemplateTemplatesTemplateIdGet(id),
    enabled: !!id,
  });
}

export function useLaunchTemplate(templateId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkshopLaunchRequest) =>
      TemplatesService.launchWorkshopTemplatesTemplateIdLaunchPost(templateId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
  });
}

export function useTemplateLaunchCounts() {
  return useQuery({
    queryKey: ['template-stats'],
    queryFn: () =>
      __request<TemplateStats[]>(OpenAPI, { method: 'GET', url: '/templates/stats' }),
    staleTime: 60_000,
  });
}
