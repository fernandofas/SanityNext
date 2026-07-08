// Centralized GROQ queries used across the frontend

// ---------------------------------------------------------------------------
// Shared projection fragments
// ---------------------------------------------------------------------------

export const authSettingsQuery = `*[_type == "authSettings"][0]{
  overlayColor{ rgb{ r,g,b }, alpha },
  modalBgColor{ rgb{ r,g,b }, alpha },
  modalBorderColor{ rgb{ r,g,b }, alpha },
  modalBorderWidth, modalBorderRadius, modalPaddingX, modalPaddingY, modalMaxWidth,
  fontFamily,
  textColor{ rgb{ r,g,b }, alpha },
  fontSize, headingFontSize, headingFontWeight,
  headingColor{ rgb{ r,g,b }, alpha },
  errorColor{ rgb{ r,g,b }, alpha },
  inputBgColor{ rgb{ r,g,b }, alpha },
  inputTextColor{ rgb{ r,g,b }, alpha },
  inputBorderColor{ rgb{ r,g,b }, alpha },
  inputBorderWidth, inputBorderRadius, inputPaddingX, inputPaddingY, inputFontSize,
  inputFocusBorderColor{ rgb{ r,g,b }, alpha },
  btnBg{ rgb{ r,g,b }, alpha },
  btnTextColor{ rgb{ r,g,b }, alpha },
  btnFontSize, btnBorderRadius, btnBorderWidth,
  btnBorderColor{ rgb{ r,g,b }, alpha },
  btnPaddingX, btnPaddingY,
  btnHoverBg{ rgb{ r,g,b }, alpha },
  btnHoverTextColor{ rgb{ r,g,b }, alpha },
  btnHoverBorderColor{ rgb{ r,g,b }, alpha },
  linkColor{ rgb{ r,g,b }, alpha },
  linkFontSize,
  linkHoverColor{ rgb{ r,g,b }, alpha },
  closeButtonColor{ rgb{ r,g,b }, alpha },
  closeButtonHoverColor{ rgb{ r,g,b }, alpha },
  signInTitle, registerTitle, signInBtnLabel, registerBtnLabel,
  registerLinkLabel, forgotPasswordLabel, alreadyHaveAccountLabel,
  registrationSuccessMessage, backToSignInLabel
}`;

const PT_CONTENT = `
  ...,
  asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename },
  images[]{
    ...,
    asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename },
    linkType,
    internalLink->{ slug },
    externalUrl,
    emailAddress
  },
  linkType,
  internalLink->{ slug },
  externalUrl,
  emailAddress,
  _type == "accordion" => @->{ _type, items[]{ question, answer[] } },
  _type == "form" => @->{
    _type, name,
    fields[]{ label, type, required, choices, placeholder },
    submitText, emailTo,
    submitBgColor, submitTextColor, submithoverBackgroundColor, submithoverTextColor,
    formStyle->{ wrapperBackgroundColor, wrapperPaddingTop, wrapperPaddingBottom, wrapperPaddingLeft, wrapperPaddingRight, wrapperBorderRadius, wrapperBorderColor, wrapperBorderWidth, wrapperBorderStyle, fieldGap, formMaxWidth, labelColor, labelFontSize, labelFontWeight, labelMarginBottom, requiredColor, inputBackgroundColor, inputTextColor, inputPlaceholderColor, inputBorderColor, inputBorderWidth, inputBorderRadius, inputFocusBorderColor, inputFocusBackgroundColor, inputPaddingX, inputPaddingY, inputFontSize, textareaMinHeight, inputShadow, selectBackgroundColor, selectTextColor, selectBorderColor, selectBorderRadius, checkRadioAccentColor, checkRadioLabelColor, checkRadioSize, checkRadioGap, submitBtnBackgroundColor, submitBtnTextColor, submitBtnHoverBackgroundColor, submitBtnHoverTextColor, submitBtnBorderColor, submitBtnBorderWidth, submitBtnBorderRadius, submitBtnPaddingX, submitBtnPaddingY, submitBtnFontSize, submitBtnFontWeight, submitBtnFullWidth, submitBtnAlign, successBackgroundColor, successTextColor, successBorderColor, errorTextColor, errorBorderColor, successMessage }
  },
  _type == "forms" => @->{
    _type, name,
    fields[]{ label, type, required, choices },
    submitText, emailTo,
    submitBgColor, submitTextColor, submithoverBackgroundColor, submithoverTextColor
  },
  _type == "slider" => @->{
    _type, title, fullWidth,
    slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } },
    autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl,
    transitionType, transitionDuration, transitionEasing,
    heightType, heightValue, objectFit, borderRadius, maxWidth,
    showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius,
    showDots, dotColor, dotActiveColor, dotSize, dotShape,
    overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY,
    containerPaddingTop, containerPaddingBottom
  },
  _type == "sections" => @->{
    _type,
    content[]{
      _type, _key, columnLayout,
      backgroundColor{ rgb { r, g, b }, alpha },
      textColor{ rgb { r, g, b }, alpha },
      backgroundImage{ asset->{ url } },
      column0[]{ ..., asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename }, linkType, internalLink->{ slug }, externalUrl, emailAddress, _type == "accordion" => @->{ _type, items[]{ question, answer[] } }, _type == "slider" => @->{ _type, title, fullWidth, slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } }, autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl, transitionType, transitionDuration, transitionEasing, heightType, heightValue, objectFit, borderRadius, maxWidth, showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius, showDots, dotColor, dotActiveColor, dotSize, dotShape, overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY, containerPaddingTop, containerPaddingBottom } },
      column1[]{ ..., asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename }, linkType, internalLink->{ slug }, externalUrl, emailAddress, _type == "accordion" => @->{ _type, items[]{ question, answer[] } }, _type == "slider" => @->{ _type, title, fullWidth, slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } }, autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl, transitionType, transitionDuration, transitionEasing, heightType, heightValue, objectFit, borderRadius, maxWidth, showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius, showDots, dotColor, dotActiveColor, dotSize, dotShape, overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY, containerPaddingTop, containerPaddingBottom } },
      column2[]{ ..., asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename }, linkType, internalLink->{ slug }, externalUrl, emailAddress, _type == "accordion" => @->{ _type, items[]{ question, answer[] } }, _type == "slider" => @->{ _type, title, fullWidth, slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } }, autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl, transitionType, transitionDuration, transitionEasing, heightType, heightValue, objectFit, borderRadius, maxWidth, showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius, showDots, dotColor, dotActiveColor, dotSize, dotShape, overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY, containerPaddingTop, containerPaddingBottom } },
      column3[]{ ..., asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename }, linkType, internalLink->{ slug }, externalUrl, emailAddress, _type == "accordion" => @->{ _type, items[]{ question, answer[] } }, _type == "slider" => @->{ _type, title, fullWidth, slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } }, autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl, transitionType, transitionDuration, transitionEasing, heightType, heightValue, objectFit, borderRadius, maxWidth, showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius, showDots, dotColor, dotActiveColor, dotSize, dotShape, overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY, containerPaddingTop, containerPaddingBottom } },
      column4[]{ ..., asset->{ _id, url, metadata { dimensions { width, height } }, altText, title, originalFilename }, linkType, internalLink->{ slug }, externalUrl, emailAddress, _type == "accordion" => @->{ _type, items[]{ question, answer[] } }, _type == "slider" => @->{ _type, title, fullWidth, slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } }, autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl, transitionType, transitionDuration, transitionEasing, heightType, heightValue, objectFit, borderRadius, maxWidth, showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius, showDots, dotColor, dotActiveColor, dotSize, dotShape, overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY } }
    }
  }
`;

const COL_OBJECT = `
  _key,
  contentName,
  backgroundColor { rgb { r, g, b }, alpha },
  textColor { rgb { r, g, b }, alpha },
  backgroundImage{ asset->{ url } },
  heading,
  title,
  content[]{ ${PT_CONTENT} }
`;

// ---------------------------------------------------------------------------
// Header Menu
// ---------------------------------------------------------------------------

export const headerMenuQuery = `*[_type == "menu" && location == "header"][0]{
  items[]{
    label,
    linkType,
    externalUrl,
    openInNewTab,
    asButton,
    buttonBackgroundColor{ rgb{ r,g,b }, alpha },
    buttonTextColor{ rgb{ r,g,b }, alpha },
    buttonHoverBackgroundColor{ rgb{ r,g,b }, alpha },
    buttonHoverTextColor{ rgb{ r,g,b }, alpha },
    buttonHoverBorderColor{ rgb{ r,g,b }, alpha },
    buttonBorderColor{ rgb{ r,g,b }, alpha },
    buttonBorderWidth,
    buttonBorderRadius,
    buttonPaddingX,
    buttonPaddingY,
    "link": select(
      linkType == "page" && defined(page->slug.current) => "/" + page->slug.current,
      linkType == "custom" && defined(path) => path,
      linkType == "external" && defined(externalUrl) => externalUrl,
      true => "#"
    ),
    subItems[]{
      label,
      linkType,
      externalUrl,
      openInNewTab,
      asButton,
      buttonBackgroundColor{ rgb{ r,g,b }, alpha },
      buttonTextColor{ rgb{ r,g,b }, alpha },
      buttonHoverBackgroundColor{ rgb{ r,g,b }, alpha },
      buttonHoverTextColor{ rgb{ r,g,b }, alpha },
      buttonHoverBorderColor{ rgb{ r,g,b }, alpha },
      buttonBorderColor{ rgb{ r,g,b }, alpha },
      buttonBorderWidth,
      buttonBorderRadius,
      buttonPaddingX,
      buttonPaddingY,
      "link": select(
        linkType == "page" && defined(page->slug.current) => "/" + page->slug.current,
        linkType == "custom" && defined(path) => path,
        linkType == "external" && defined(externalUrl) => externalUrl,
        true => "#"
      )
    }
  }
}`;

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export const allPagesQuery = `*[_type == "page"]{ title, slug }`;

export const allPageSlugsQuery = `*[_type == "page"]{ "slug": slug.current }`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  metaTitle,
  metaDescription,
  keywords,
  canonicalUrl,
  noIndex,
  ogImage{ asset->{ url }, alt, width, height },
  sections[]{
    _type,
    _key,
    columnLayout,
    backgroundColor{ rgb { r, g, b }, alpha },
    textColor{ rgb { r, g, b }, alpha },
    backgroundImage{ asset->{ url } },

    // columnBack sections: columnContent[] array of column objects
    columnContent[]{ ${COL_OBJECT} },

    // columnSection sections: column0–column4 flat PortableText arrays
    column0[]{ ${PT_CONTENT} },
    column1[]{ ${PT_CONTENT} },
    column2[]{ ${PT_CONTENT} },
    column3[]{ ${PT_CONTENT} },
    column4[]{ ${PT_CONTENT} },

    // form at section level (document reference)
    _type == "form" => @->{
      _type, name,
      fields[]{ label, type, required, choices, placeholder },
      submitText, emailTo,
      submitBgColor, submitTextColor, submithoverBackgroundColor, submithoverTextColor,
      formStyle->{ wrapperBackgroundColor, wrapperPaddingTop, wrapperPaddingBottom, wrapperPaddingLeft, wrapperPaddingRight, wrapperBorderRadius, wrapperBorderColor, wrapperBorderWidth, wrapperBorderStyle, fieldGap, formMaxWidth, labelColor, labelFontSize, labelFontWeight, labelMarginBottom, requiredColor, inputBackgroundColor, inputTextColor, inputPlaceholderColor, inputBorderColor, inputBorderWidth, inputBorderRadius, inputFocusBorderColor, inputFocusBackgroundColor, inputPaddingX, inputPaddingY, inputFontSize, textareaMinHeight, inputShadow, selectBackgroundColor, selectTextColor, selectBorderColor, selectBorderRadius, checkRadioAccentColor, checkRadioLabelColor, checkRadioSize, checkRadioGap, submitBtnBackgroundColor, submitBtnTextColor, submitBtnHoverBackgroundColor, submitBtnHoverTextColor, submitBtnBorderColor, submitBtnBorderWidth, submitBtnBorderRadius, submitBtnPaddingX, submitBtnPaddingY, submitBtnFontSize, submitBtnFontWeight, submitBtnFullWidth, submitBtnAlign, successBackgroundColor, successTextColor, successBorderColor, errorTextColor, errorBorderColor, successMessage }
    },
    _type == "slider" => @->{
      _type, title, fullWidth,
      slides[]{ heading, subheading, body, linkType, externalUrl, internalLink->{ slug }, linkLabel, altText, textPosition, image{ asset->{ _id, url, metadata{ dimensions{ width, height } } } } },
      autoplay, autoplayDelay, loop, pauseOnHover, direction, swipe, keyboardControl,
      transitionType, transitionDuration, transitionEasing,
      heightType, heightValue, objectFit, borderRadius, maxWidth,
      showArrows, arrowBackgroundColor, arrowColor, arrowHoverBackgroundColor, arrowSize, arrowBorderRadius,
      showDots, dotColor, dotActiveColor, dotSize, dotShape,
      overlayColor, headingColor, headingFontSize, headingFontWeight, subheadingColor, subheadingFontSize, bodyTextColor, bodyTextFontSize, linkBtnBackgroundColor, linkBtnTextColor, linkBtnBorderRadius, textPaddingX, textPaddingY
    }
  }
}`;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footerMenusQuery = `*[_type == "footerMenu"]{
  title,
  column,
  links[]{
    label,
    linkType,
    emailAddress,
    "link": select(
      linkType == "page" && defined(page->slug.current) => "/" + page->slug.current,
      linkType == "custom" && defined(path) => path,
      linkType == "email" && defined(emailAddress) => "mailto:" + emailAddress,
      linkType == "auth" => "__auth__",
      linkType == "logout" => "__logout__",
      true => "#"
    )
  }
}`;

export const footerSettingsQuery = `*[_type == "footerSettings"][0]{
  logo{ asset->{ url } },
  address,
  email,
  backgroundColor{ rgb{ r,g,b }, alpha },
  textColor{ rgb{ r,g,b }, alpha },
  textHoverColor{ rgb{ r,g,b }, alpha },
  fontFamily,
  fontSize,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderColor{ rgb{ r,g,b }, alpha },
  borderStyle
}`;

export const footerContentQuery = `*[_type == "footerContent"][0]{
  content[]{
    ...,
    asset->{ _id, url, metadata{ dimensions{ width, height } }, altText, title, originalFilename },
    linkType,
    internalLink->{ slug },
    externalUrl,
    emailAddress
  },
  backgroundColor{ rgb { r, g, b }, alpha },
  backgroundImage{ asset->{ url } },
  textColor{ rgb { r, g, b }, alpha }
}`;

// ---------------------------------------------------------------------------
// Global Settings
// ---------------------------------------------------------------------------

export const globalSettingsQuery = `*[_type == "globalSettings"][0]{
  bodyMaxWidth,
  fontFamily,
  fontSizeBase,
  lineHeight,
  letterSpacing,
  bodyBackgroundColor{ rgb{ r,g,b }, alpha },
  bodyBackgroundImage{ asset->{ url } },
  backgroundSize,
  backgroundRepeat,
  backgroundPosition,
  bodyMarginTop,
  bodyMarginBottom,
  bodyMarginLeft,
  bodyMarginRight,
  bodyPaddingTop,
  bodyPaddingBottom,
  bodyPaddingLeft,
  bodyPaddingRight
}`;

// ---------------------------------------------------------------------------
// Web Settings
// ---------------------------------------------------------------------------

export const webSettingsQuery = `*[_type == "webSettings"][0]{
  siteName,
  siteUrl,
  metaDescription,
  keywords,
  canonicalBase,
  favicon{ asset->{ url } },
  appleTouchIcon{ asset->{ url } },
  ogLocale,
  ogType,
  ogImage{ asset->{ url }, alt, width, height },
  twitterCard,
  twitterSite,
  twitterCreator,
  gaCode
}`;

export const headerSettingsQuery = `*[_type == "headerSettings"][0]{
  logoPosition,
  menuPosition,
  backgroundColor{ rgb{ r,g,b }, alpha },
  textColor{ rgb{ r,g,b }, alpha },
  textHoverColor{ rgb{ r,g,b }, alpha },
  fontFamily,
  fontSize,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderColor{ rgb{ r,g,b }, alpha },
  borderStyle,
  mobileIconType,
  mobileIconCustom{ asset->{ url } },
  mobileIconColor{ rgb{ r,g,b }, alpha },
  mobileIconBackgroundColor{ rgb{ r,g,b }, alpha },
  mobileIconSize,
  mobileIconPadding,
  mobileIconBorderRadius,
  mobileDropdownBackgroundColor{ rgb{ r,g,b }, alpha },
  mobileDropdownTextColor{ rgb{ r,g,b }, alpha },
  mobileDropdownFontFamily,
  mobileDropdownFontSize,
  mobileDropdownPaddingX,
  mobileDropdownPaddingY,
  mobileDropdownBorderRadius
}`;

export const blogSearchStyleQuery = `*[_type == "blogSearchStyle"][0]{
  labelColor{ rgb{ r,g,b }, alpha },
  labelFontSize,
  inputBackgroundColor{ rgb{ r,g,b }, alpha },
  inputTextColor{ rgb{ r,g,b }, alpha },
  inputPlaceholderColor{ rgb{ r,g,b }, alpha },
  inputBorderColor{ rgb{ r,g,b }, alpha },
  inputBorderWidth,
  inputBorderRadius,
  inputFocusBorderColor{ rgb{ r,g,b }, alpha },
  inputPaddingX,
  inputPaddingY,
  searchBtnBackgroundColor{ rgb{ r,g,b }, alpha },
  searchBtnTextColor{ rgb{ r,g,b }, alpha },
  searchBtnHoverBackgroundColor{ rgb{ r,g,b }, alpha },
  searchBtnHoverTextColor{ rgb{ r,g,b }, alpha },
  searchBtnBorderColor{ rgb{ r,g,b }, alpha },
  searchBtnBorderWidth,
  searchBtnBorderRadius,
  searchBtnPaddingX,
  searchBtnPaddingY,
  searchBtnFontSize,
  searchBtnLabel,
  clearBtnTextColor{ rgb{ r,g,b }, alpha },
  clearBtnHoverTextColor{ rgb{ r,g,b }, alpha },
  clearBtnFontSize,
  clearBtnLabel,
  wrapperBackgroundColor{ rgb{ r,g,b }, alpha },
  wrapperPaddingX,
  wrapperPaddingY,
  wrapperBorderRadius,
  gap
}`;

export const cookieBannerQuery = `*[_type == "cookieBanner"][0]{
  bannerText,
  acceptButtonText,
  rejectButtonText,
  settingsButtonText,
  privacyPolicyLink{ text, url },
  cookieScript,
  backgroundColor{ rgb{ r,g,b }, alpha },
  textColor{ rgb{ r,g,b }, alpha },
  bannerPaddingTop, bannerPaddingBottom, bannerPaddingLeft, bannerPaddingRight,
  bannerBorderTopWidth, bannerBorderRightWidth, bannerBorderBottomWidth, bannerBorderLeftWidth,
  bannerBorderColor{ rgb{ r,g,b }, alpha },
  bannerBorderStyle,
  acceptButtonBg{ rgb{ r,g,b }, alpha },
  acceptButtonText_color{ rgb{ r,g,b }, alpha },
  acceptButtonHoverBg{ rgb{ r,g,b }, alpha },
  acceptButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  acceptButtonBorderRadius,
  rejectButtonBg{ rgb{ r,g,b }, alpha },
  rejectButtonTextColor{ rgb{ r,g,b }, alpha },
  rejectButtonBorderColor{ rgb{ r,g,b }, alpha },
  rejectButtonHoverBg{ rgb{ r,g,b }, alpha },
  rejectButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  rejectButtonHoverBorderColor{ rgb{ r,g,b }, alpha },
  rejectButtonBorderRadius,
  settingsButtonBg{ rgb{ r,g,b }, alpha },
  settingsButtonTextColor{ rgb{ r,g,b }, alpha },
  settingsButtonBorderColor{ rgb{ r,g,b }, alpha },
  settingsButtonHoverBg{ rgb{ r,g,b }, alpha },
  settingsButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  settingsButtonHoverBorderColor{ rgb{ r,g,b }, alpha },
  settingsButtonBorderRadius,
  popupBackgroundColor{ rgb{ r,g,b }, alpha },
  popupTextColor{ rgb{ r,g,b }, alpha },
  popupBorderColor{ rgb{ r,g,b }, alpha },
  popupBorderWidth,
  popupBorderRadius,
  popupPaddingX,
  popupPaddingY,
  overlayColor{ rgb{ r,g,b }, alpha },
  popupFontFamily,
  popupFontSize,
  toggleOnColor{ rgb{ r,g,b }, alpha },
  toggleOffColor{ rgb{ r,g,b }, alpha },
  saveButtonBg{ rgb{ r,g,b }, alpha },
  saveButtonTextColor{ rgb{ r,g,b }, alpha },
  saveButtonBorderRadius,
  saveButtonHoverBg{ rgb{ r,g,b }, alpha },
  saveButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonBg{ rgb{ r,g,b }, alpha },
  cancelButtonTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonBorderColor{ rgb{ r,g,b }, alpha },
  cancelButtonBorderRadius,
  cancelButtonHoverBg{ rgb{ r,g,b }, alpha },
  cancelButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonHoverBorderColor{ rgb{ r,g,b }, alpha }
}`;

export const cookiePopupSettingsQuery = `*[_type == "cookiePopupSettings"][0]{
  popupTitle,
  essentialLabel,
  essentialDescription,
  analyticsLabel,
  analyticsDescription,
  marketingLabel,
  marketingDescription,
  alwaysOnText,
  saveButtonText,
  cancelButtonText,
  overlayColor{ rgb{ r,g,b }, alpha },
  popupBackgroundColor{ rgb{ r,g,b }, alpha },
  popupTextColor{ rgb{ r,g,b }, alpha },
  popupBorderColor{ rgb{ r,g,b }, alpha },
  popupBorderWidth,
  popupBorderRadius,
  popupPaddingX,
  popupPaddingY,
  popupFontFamily,
  popupFontSize,
  headingFontSize,
  headingFontWeight,
  toggleOnColor{ rgb{ r,g,b }, alpha },
  toggleOffColor{ rgb{ r,g,b }, alpha },
  saveButtonBg{ rgb{ r,g,b }, alpha },
  saveButtonTextColor{ rgb{ r,g,b }, alpha },
  saveButtonBorderRadius,
  saveButtonHoverBg{ rgb{ r,g,b }, alpha },
  saveButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonBg{ rgb{ r,g,b }, alpha },
  cancelButtonTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonBorderColor{ rgb{ r,g,b }, alpha },
  cancelButtonBorderWidth,
  cancelButtonBorderRadius,
  cancelButtonHoverBg{ rgb{ r,g,b }, alpha },
  cancelButtonHoverTextColor{ rgb{ r,g,b }, alpha },
  cancelButtonHoverBorderColor{ rgb{ r,g,b }, alpha }
}`;

export const redirectsQuery = `{
  "pages": *[_type == "page" && defined(redirects)]{ "slug": slug.current, redirects[]{ from, type } },
  "posts": *[_type == "blogPost" && defined(redirects)]{ "slug": slug.current, redirects[]{ from, type } }
}`;

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export const blogListQuery = `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  coverImage{ asset->{ url } },
  excerpt,
  "author": author->{ name, slug, image{ asset->{ url } } },
  "categories": categories[]->{ title, slug }
}`;

export const blogSearchQuery = `*[_type == "blogPost"
  && ($q == null || title match $q || pt::text(content) match $q)
  && ($author == null || author->slug.current == $author)
  && ($category == null || $category in categories[]->slug.current)
  && ($from == null || publishedAt >= $from)
  && ($to == null || publishedAt < $to)
] | order(publishedAt desc){
  _id, title, slug, publishedAt,
  coverImage{ asset->{ url } },
  excerpt,
  "author": author->{ name, slug, image{ asset->{ url } } },
  "categories": categories[]->{ title, slug }
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  metaTitle,
  metaDescription,
  keywords,
  canonicalUrl,
  noIndex,
  ogImage{ asset->{ url }, alt, width, height },
  excerpt,
  coverImage{ asset->{ url } },
  columnLayout,
  backgroundColor{ rgb { r, g, b }, alpha },
  backgroundImage{ asset->{ url } },
  textColor{ rgb { r, g, b }, alpha },
  "author": author->{ name, slug, bio, image{ asset->{ url } } },
  "categories": categories[]->{ title, slug },
  content[]{ ${PT_CONTENT} },
  columnContent[]{ ${COL_OBJECT} }
}`;

export const recentBlogPostsQuery = `*[_type == "blogPost" && slug.current != $excludeSlug] | order(publishedAt desc)[0..2]{
  _id, title, slug, publishedAt,
  coverImage{ asset->{ url } }
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0]{
  name, slug, bio, image{ asset->{ url } }
}`;

export const allAuthorsQuery = `*[_type == "author"]{ name, slug, bio, image{ asset->{ url } } }`;

export const allCategoriesQuery = `*[_type == "category"]{ title, slug }`;

export const allBlogSlugQuery = `*[_type == "blogPost"]{ "slug": slug.current }`;

// ---------------------------------------------------------------------------
// Form Style (standalone)
// ---------------------------------------------------------------------------

export const formStyleQuery = `*[_type == "formStyle"][0]{
  wrapperBackgroundColor, wrapperPaddingTop, wrapperPaddingBottom, wrapperPaddingLeft, wrapperPaddingRight,
  wrapperBorderRadius, wrapperBorderColor, wrapperBorderWidth, wrapperBorderStyle,
  fieldGap, formMaxWidth,
  labelColor, labelFontSize, labelFontWeight, labelMarginBottom, requiredColor,
  inputBackgroundColor, inputTextColor, inputPlaceholderColor, inputBorderColor,
  inputBorderWidth, inputBorderRadius, inputFocusBorderColor, inputFocusBackgroundColor,
  inputPaddingX, inputPaddingY, inputFontSize, textareaMinHeight, inputShadow,
  selectBackgroundColor, selectTextColor, selectBorderColor, selectBorderRadius,
  checkRadioAccentColor, checkRadioLabelColor, checkRadioSize, checkRadioGap,
  submitBtnBackgroundColor, submitBtnTextColor, submitBtnHoverBackgroundColor, submitBtnHoverTextColor,
  submitBtnBorderColor, submitBtnBorderWidth, submitBtnBorderRadius,
  submitBtnPaddingX, submitBtnPaddingY, submitBtnFontSize, submitBtnFontWeight,
  submitBtnFullWidth, submitBtnAlign,
  successBackgroundColor, successTextColor, successBorderColor,
  errorTextColor, errorBorderColor, successMessage
}`;