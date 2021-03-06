import { GitmentOptions } from "@/models/comments-system.class";


export class Theme {
  menu: ThemeMenu = new ThemeMenu();
  menu_icons: {
    [ key: string ]: string | boolean
  } = {
    enable: false
  };
  social = {};
  social_icons = {
    enable: false
  };
  blur = new ThemeBlur();
  page_404 = new ThemeCustom404();
  avatar: ThemeAvatar = new ThemeAvatar();
  background: ThemeBackground = new ThemeBackground();
  gitment = new GitmentOptions();
  google_analytics = new GoogleAnalytics();
  powered_by = '';

  constructor(raw?: any) {
    const raw_theme = raw && raw['theme_config'];
    if (raw_theme) {
      this.menu = new ThemeMenu(raw_theme.menu);
      this.menu_icons = raw_theme.menu_icons;
      this.social = raw_theme.social;
      this.social_icons = raw_theme.social_icons;
      this.page_404 = new ThemeCustom404(raw_theme.page_404);
      this.avatar = new ThemeAvatar(raw_theme.avatar);
      this.background = new ThemeBackground(raw_theme.background);
      this.gitment = new GitmentOptions(raw_theme.gitment);
      this.powered_by = raw_theme.powered_by;
      this.blur = new ThemeBlur(raw_theme.blur);
      this.google_analytics = new GoogleAnalytics(raw_theme.google_analytics);
    }
  }
}

export class ThemeCustom404 {
  enable = false;
  source_path = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [key]: raw[key] });
        }
      }
    }
  }
}

interface LiteMenu {
  Home: string;
  Archives: string;
  Categories?: string;
  Tags?: string;
}

export class ThemeMenu implements LiteMenu {
  Home = '/';
  Archives = '/archives';

  constructor(raw?: { [ key: string ]: string | boolean }) {
    const extract: { [ key: string ]: string } = {
      Home: '/',
      Archives: '/archives',
      Categories: '/categories',
      Tags: '/tags'
    };

    const basicKeys = Object.keys(extract);
    if (raw) {
      for (const basicKey of basicKeys) {
        if (typeof raw[basicKey] === 'boolean' && raw[basicKey]) {
          Object.assign(this, { [basicKey]: extract[basicKey] });
        }
      }

      for (const otherKey of Object.keys(raw)) {
        if (basicKeys.every(basicKey => otherKey !== basicKey)) {
          Object.assign(this, { [otherKey]: raw[otherKey] });
        }
      }
    }
  }
}

export class ThemeAvatar {
  enable = false;
  url = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [key]: raw[key] });
        }
      }
    }
  }
}

export class ThemeBackground {
  background_color = '';
  enable_picture = false;
  url = '';
  css_size = '';
  css_position = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [key]: raw[key] });
        }
      }
    }
  }
}

export class ThemeBlur {
  background_color = 'white';

  hide_overflow = true;

  gaussian_radius = {
    top_navigator: 30,
    header: 30,
    footer: 80
  };

  font = {
    color: 'white',
    shadow: '1px 1px 8px #444',
  };

  constructor(raw?: any) {
    if (raw) {
      this.background_color = raw.background_color;
      this.hide_overflow = raw.hide_overflow;
      this.gaussian_radius = {
        ...this.gaussian_radius,
        ...raw.gaussian_radius
      };
      this.font = {
        ...this.font,
        ...raw.font
      };
    }
  }

}

export class GoogleAnalytics {
  enable = false;
  track_id = '';

  constructor(raw?: any) {
    if (raw) {
      this.enable = raw.enable;
      this.track_id = raw.track_id;
    }
  }
}
