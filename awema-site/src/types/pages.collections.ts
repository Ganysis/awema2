import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const about = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/about",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    mission: z.object({
      enable: z.boolean(),
      title: z.string(),
      image: z.string(),
      content: z.string(),
      bulletpoints: z.array(z.string()),
    }),

    funfacts: z.object({
      enable: z.boolean(),
      funfacts_item: z.array(
        z.object({
          name: z.string(),
          count: z.number(),
          extension: z.string(),
        }),
      ),
    }),

    vision: z.object({
      enable: z.boolean(),
      title: z.string(),
      image: z.string(),
      content: z.string(),
    }),

    featured_testimonial: z
      .object({
        enable: z.boolean(),
        name: z.string(),
        designation: z.string(),
        quote: z.string(),
        image: z.string(),
        video: z
          .object({
            enable: z.boolean(),
            video_embed_link: z.string(),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.union([z.date(), z.string()]).optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
    author_profile: z.string().optional(),
    draft: z.boolean(),

    banner: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
  }),
});

export const career = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/career",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    banner: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),

    intro: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        content: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      })
      .optional(),

    flexibility: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        flexibility_items: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            content: z.string(),
          }),
        ),
      })
      .optional(),

    benifits: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        benifits_items: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            content: z.string(),
          }),
        ),
      })
      .optional(),

    gallery: z
      .object({
        enable: z.boolean(),
        gallery_items: z.array(
          z.object({
            image: z.string(),
            width: z.string(),
          }),
        ),
      })
      .optional(),

    job_type: z.string().optional(),
  }),
});

export const contact = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/contact",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    banner: z.object({
      title: z.string(),
      description: z.string(),
    }),

    contact_info: z.object({
      enable: z.boolean(),
      title: z.string(),
      address_list: z.array(z.string()),
    }),

    services: z.object({
      enable: z.boolean(),
      title: z.string(),
      service_list: z.array(z.string()),
    }),
  }),
});

export const homepage = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    banner: z.object({
      enable: z.boolean(),
      bg_cover: z.string(),
      title: z.string(),
      content: z.string(),
      image: z.string(),
      video: z
        .object({
          enable: z.boolean(),
          video_embed_link: z.string(),
        })
        .optional(),
      form: z
        .object({
          enable: z.boolean(),
          form_action: z.string().optional(),
          button_label: z.string(),
        })
        .optional(),
      button: z
        .object({
          enable: z.boolean(),
          icon: z.string(),
          label: z.string(),
          link: z.string(),
          content: z.string(),
        })
        .optional(),
    }),

    clients_logo_slider: z.object({
      enable: z.boolean(),
      logos: z.array(z.string()),
    }),

    homepage_tab: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      tablist: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          image: z.string(),
          content: z.string(),
          button: z
            .object({
              enable: z.boolean(),
              label: z.string(),
              link: z.string(),
            })
            .optional(),
        }),
      ),
    }),

    tools: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      logos: z.array(z.string()),
    }),

    achivement: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      funfacts: z.array(
        z.object({
          name: z.string(),
          count: z.number(),
          extension: z.string(),
        }),
      ),
      services: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
        }),
      ),
    }),

    workflow: z.object({
      enable: z.boolean(),
      title: z.string(),
      image: z.string(),
      content: z.string(),
    }),

    about_us: z.object({
      enable: z.boolean(),
      title: z.string(),
      image: z.string(),
      content: z.string(),
      bulletpoints: z.array(z.string()),
    }),

    testimonial: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      button: z
        .object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        })
        .optional(),
      testimonial_item: z.array(
        z.object({
          name: z.string(),
          image: z.string(),
          designation: z.string(),
          content: z.string(),
        }),
      ),
    }),
  }),
});

export const howItWorks = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/how-it-works",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    howItWorks: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

export const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pages",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),
    meta_title: z.string(),

    sidelist: z.array(z.string()).optional(),
  }),
});

export const pricing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pricing",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    outlet: z.string(),
    offer: z.string().optional(),
    monthly_yearly_toggle: z.enum(["monthly", "yearly", "toggle"]),
    draft: z.boolean(),

    // Banner
    banner: z.object({
      title: z.string(),
      description: z.string(),
    }),

    // Pricing cards
    pricing_cards: z
      .array(
        z.object({
          name: z.string(),
          content: z.string().optional(),
          currency: z.string().optional(),
          monthly_price: z.string().optional(),
          monthly_content: z.string().optional(),
          yearly_content: z.string().optional(),
          yearly_price: z.string().optional(),
          featured: z.boolean().optional(),
          button_label: z.string().optional(),
          button_link: z.string().optional(),
          services: z.array(z.string()).optional(),
          recomended: z.boolean().optional(),
        }),
      )
      .optional(),

    // Pricing table info
    pricing_table_data: z
      .array(
        z.object({
          table_row: z.array(
            z.object({
              name: z.string(),
              monthly_icon: z.string(),
              yearly_icon: z.string(),
              monthly_count: z.string(),
              yearly_count: z.string(),
              monthly_content: z.string(),
              yearly_content: z.string(),
            }),
          ),
        }),
      )
      .optional(),
  }),
});

export const services = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/services",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    // Banner
    banner: z.object({
      title: z.string(),
      description: z.string(),
    }),

    // Service list
    services: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

export const team = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/team",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    // Banner
    banner: z.object({
      title: z.string(),
      description: z.string(),
    }),

    // Team member list
    team_member: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        designation: z.string(),
        group: z.string(),
        social: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            link: z.string(),
          }),
        ),
      }),
    ),
  }),
});

export const testimonial = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/testimonial",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean(),

    // Banner
    banner: z.object({
      title: z.string(),
      description: z.string(),
    }),

    // Testimonial items list
    testimonial_items: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        designation: z.string(),
        content: z.string(),
      }),
    ),

    // Featured testimonial
    featured_testimonial: z.object({
      enable: z.boolean(),
      name: z.string(),
      designation: z.string(),
      quote: z.string(),
      image: z.string(),
      video: z.object({
        enable: z.boolean(),
        video_embed_link: z.string(),
      }),
    }),
  }),
});
