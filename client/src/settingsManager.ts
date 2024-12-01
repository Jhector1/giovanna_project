import { UserSettings } from './types';

export default class SettingsManager {
  /**
   * Applies the given UI settings to the application.
   * Only updates theme-related classes while preserving other classes.
   */
  static applyUISettings(settings: UserSettings) {
    const updateClasses = (element: Element | null, newClass: string | null) => {
      if (element && newClass) {
        const themeClasses = Array.from(element.classList).filter(
          cls => cls.includes('mode') || cls.includes('colorChoice'),
        );
        element.classList.remove(...themeClasses);
        element.classList.add(newClass);
      }
    };

    updateClasses(document.body, settings.globalMode);
    updateClasses(document.body, settings.textMode);

    const container = document.querySelector('.container');
    updateClasses(container, settings.globalMode);

    const header = document.querySelector('#header');
    updateClasses(header, settings.headerMode);

    const menuButtons = document.querySelectorAll('.menu_button, .menu_selected');
    menuButtons.forEach(btn => updateClasses(btn, settings.sidebarMode));
  }

  /**
   * Returns the default UI settings.
   * Can accept overrides to customize defaults for specific scenarios.
   */
  static getDefaultSettings(overrides?: Partial<UserSettings>): UserSettings {
    const defaults: UserSettings = {
      globalMode: 'globalMode',
      headerMode: 'colorChoiceBlackHeader',
      sidebarMode: 'sidebar_mode',
      textMode: 'colorChoiceYellowTypography',
      buttonMode: 'blue',
    };

    return { ...defaults, ...overrides };
  }
}
