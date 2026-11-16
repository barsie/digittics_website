import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";

const BLOG_PAGE_SIZE = 3;

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            // logo: {
            //   populate: {
            //     image: {
            //       fields: ["url", "alternativeText"],
            //     },
            //   },
            // },
            cta: true,
          },
        },
        "blocks.info-block": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
        "blocks.partner-section": {
          populate: {
            partners: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
          },
        },
        "blocks.feature-section": {
          populate: {
            feature: true,
          },
        },
        "blocks.subscribe": {
          populate: true,
        },
      },
    },
  },
});


export async function getHomePage() {
  return await fetchAPI(`/api/home-page?${homePageQuery}`, { method: "GET" });
}

const globalSettingQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        policies: true,
      },
    },
  },
});

export async function getGlobalSettings() {
  return fetchAPI(`/api/global?${globalSettingQuery}`, { method: "GET" });
}

const pageByQuerySlug = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              // logo: {
              //   populate: {
              //     image: {
              //       fields: ["url", "alternativeText"],
              //     },
              //   },
              // },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
          "blocks.partner-section": {
            populate: {
              partners: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "blocks.feature-section": {
            populate: {
              feature: true,
            },
          },
          "blocks.feature-article": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: true,
            },
          },
          "blocks.subscribe": {
            populate: true,
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  return fetchAPI(`/api/pages?${pageByQuerySlug(slug)}`, { method: "GET" });
}


export async function getContent(
  path: string, 
  featured?: boolean, 
  query?: string,
  page?: string,

) {

  const filters: any = {
    ...( featured && { featured: { $eq: featured} }),
  };

  if (query) {
    filters.$or = [
      { title: { $containsi: query }},
      { description: { $containsi: query }},
    ];
  }

  const search = qs.stringify({
    sort: "createdAt:desc",
    filters,
    pagination: {
      pageSize: BLOG_PAGE_SIZE,
      page: parseInt(page || "1"),
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"]
      },
    },
  });

  return fetchAPI(`${path}?${search}`, {method: "GET"})
}

const blogPopulate = {
  blocks: {
    on: {
      "blocks.hero-section": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          // logo: {
          //   populate: {
          //     image: {
          //       fields: ["url", "alternativeText"],
          //     },
          //   },
          // },
          cta: true,
        },
      },
      "blocks.info-block": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          cta: true,
        },
      },
      "blocks.feature-article": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: true,
        },
      },
      "blocks.subscribe": {
        populate: true,
      },
      "blocks.heading": {
        populate: true,
      },
      "blocks.paragraph-with-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "blocks.paragraph": {
        populate: true,
      },
      "blocks.full-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
};

export async function getContentBySlug(slug: string, path: string) {
  const queryParams = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      ...blogPopulate,
    },
  },
  {encodeValuesOnly: true}
);

  return fetchAPI(`${path}?${queryParams}`, {
    method: "GET", 
    next: {revalidate: 0}
    // cache: "no-store"
  });

}