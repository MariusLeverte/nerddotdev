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
export interface user extends SanityDocument {
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
  skills?: Array<SanityKeyedReference<skill>>;

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
export interface skill extends SanityDocument {
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
  category?: Array<SanityKeyedReference<skillCategory>>;

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
export interface skillCategory extends SanityDocument {
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
export interface project extends SanityDocument {
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
  previewColor?: colorPicker;

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
      role?: SanityReference<projectRole>;

      /**
       * user — `reference`
       *
       *
       */
      user?: SanityReference<user>;
    }>
  >;
}

/**
 * Project role
 *
 *
 */
export interface projectRole extends SanityDocument {
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
export interface page extends SanityDocument {
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

export type Documents =
  | user
  | skill
  | skillCategory
  | project
  | projectRole
  | page;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type colorPicker = any;
