import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * User
 *
 *
 */
export interface User extends SanityDocument {
  _type: "user";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * intro — `string`
   *
   *
   */
  intro?: string;

  /**
   * about — `array`
   *
   *
   */
  about?: Array<SanityKeyed<SanityBlock>>;

  /**
   * photo — `object`
   *
   *
   */
  photo?: {
    _type: "photo";
    /**
     * photoImage — `image`
     *
     *
     */
    photoImage?: {
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    };

    /**
     * photoURL — `string`
     *
     *
     */
    photoURL?: string;
  };

  /**
   * social — `object`
   *
   *
   */
  social?: {
    _type: "social";
    /**
     * github — `string`
     *
     *
     */
    github?: string;

    /**
     * linkedin — `string`
     *
     *
     */
    linkedin?: string;
  };

  /**
   * Skills — `array`
   *
   *
   */
  skills?: Array<SanityKeyedReference<Skill>>;

  /**
   * noob — `array`
   *
   *
   */
  noob?: Array<SanityKeyedReference<Skill>>;

  /**
   * Repos — `array`
   *
   *
   */
  repos?: Array<
    SanityKeyed<{
      _type: "repo";
      /**
       * name — `string`
       *
       *
       */
      name?: string;

      /**
       * html_url — `url`
       *
       *
       */
      html_url?: string;

      /**
       * description — `text`
       *
       *
       */
      description?: string;

      /**
       * homepage — `url`
       *
       *
       */
      homepage?: string;

      /**
       * language — `string`
       *
       *
       */
      language?: string;
    }>
  >;
}

/**
 * Skill
 *
 *
 */
export interface Skill extends SanityDocument {
  _type: "skill";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Category — `array`
   *
   *
   */
  category?: Array<SanityKeyedReference<SkillCategory>>;

  /**
   * thread — `string`
   *
   *
   */
  thread?: string;
}

/**
 * Skill category
 *
 *
 */
export interface SkillCategory extends SanityDocument {
  _type: "skillCategory";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * photo — `object`
   *
   *
   */
  photo?: {
    _type: "photo";
    /**
     * photoImage — `image`
     *
     *
     */
    photoImage?: {
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    };
  };

  /**
   * previewColor — `colorPicker`
   *
   *
   */
  previewColor?: ColorPicker;

  /**
   * about — `array`
   *
   *
   */
  about?: Array<SanityKeyed<SanityBlock>>;

  /**
   * developers — `array`
   *
   *
   */
  developers?: Array<
    SanityKeyed<{
      _type: "developer";
      /**
       * role — `reference`
       *
       *
       */
      role?: SanityReference<ProjectRole>;

      /**
       * user — `reference`
       *
       *
       */
      user?: SanityReference<User>;
    }>
  >;
}

/**
 * Project role
 *
 *
 */
export interface ProjectRole extends SanityDocument {
  _type: "projectRole";

  /**
   * name — `string`
   *
   *
   */
  name?: string;
}

/**
 * page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * content — `array`
   *
   *
   */
  content?: Array<
    SanityKeyed<{
      _type: "banner";
      /**
       * title — `string`
       *
       *
       */
      title?: string;

      /**
       * text — `text`
       *
       *
       */
      text?: string;

      /**
       * image — `image`
       *
       *
       */
      image?: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      };
    }>
  >;
}

/**
 * share
 *
 *
 */
export interface Share extends SanityDocument {
  _type: "share";

  /**
   * content — `object`
   *
   *
   */
  content?: {
    _type: "content";
    /**
     * text — `array`
     *
     *
     */
    text?: Array<SanityKeyed<SanityBlock>>;

    /**
     * url — `url`
     *
     *
     */
    url?: string;
  };

  /**
   * skills — `array`
   *
   *
   */
  skills?: Array<SanityKeyedReference<Skill | SkillCategory>>;

  /**
   * category — `array`
   *
   *
   */
  category?: Array<SanityKeyedReference<ShareCategory>>;

  /**
   * user — `reference`
   *
   *
   */
  user?: SanityReference<User>;

  /**
   * data — `text`
   *
   *
   */
  data?: string;

  /**
   * opengraph — `object`
   *
   *
   */
  opengraph?: {
    _type: "opengraph";
    /**
     * title — `string`
     *
     *
     */
    title?: string;

    /**
     * description — `text`
     *
     *
     */
    description?: string;

    /**
     * image — `string`
     *
     *
     */
    image?: string;

    /**
     * url — `string`
     *
     *
     */
    url?: string;
  };
}

/**
 * shareCategory
 *
 *
 */
export interface ShareCategory extends SanityDocument {
  _type: "shareCategory";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

export type Documents =
  | User
  | Skill
  | SkillCategory
  | Project
  | ProjectRole
  | Page
  | Share
  | ShareCategory;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type ColorPicker = any;
