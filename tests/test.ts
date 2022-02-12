import process from 'process';
import os from 'os';
import tty from 'tty';
import { ColorSupportObject, SupportsColor } from '../src/types';
import { createNodeSupportsColor } from '../src/node.create';

const currentNodeVersion = process.versions.node;

describe('@nkp/supports-colors', () => {
  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      value: 'linux',
    });

    Object.defineProperty(process.versions, 'node', {
      value: currentNodeVersion,
    });

    process.stdout.isTTY = true;
    process.argv = [];
    process.env = {};
    tty.isatty = () => true;
  });

  // FIXME
  it('return true if `FORCE_COLOR` is in env', async () => {
    process.stdout.isTTY = false;
    process.env['FORCE_COLOR'] = true as any;
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(1);
  });

  it('return true if `FORCE_COLOR` is in env, but honor 256', async () => {
    process.argv = ['--color=256',];
    process.env['FORCE_COLOR'] = true as any;
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('return true if `FORCE_COLOR` is in env, but honor 256 #2', async () => {
    process.argv = ['--color=256',];
    process.env['FORCE_COLOR'] = '1';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('return false if `FORCE_COLOR` is in env and is 0', async () => {
    process.env['FORCE_COLOR'] = '0';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('do not cache `FORCE_COLOR`', async () => {
    process.env['FORCE_COLOR'] = '0';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
    process.env['FORCE_COLOR'] = '1';
    const updatedStdOut = result({ isTTY: tty.isatty(1), });
    expect(updatedStdOut).toBeTruthy();
  });

  it('return false if not TTY', async () => {
    process.stdout.isTTY = false;
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return false if --no-color flag is used', async () => {
    process.env = { TERM: 'xterm-256color', };
    process.argv = ['--no-color',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return false if --no-colors flag is used', async () => {
    process.env = {TERM: 'xterm-256color',};
    process.argv = ['--no-colors',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return true if --color flag is used', async () => {
    process.argv = ['--color',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if --colors flag is used', async () => {
    process.argv = ['--colors',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `COLORTERM` is in env', async () => {
    process.env['COLORTERM'] = true as any;
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('support `--color=true` flag', async () => {
    process.argv = ['--color=true',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('support `--color=always` flag', async () => {
    process.argv = ['--color=always',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('support `--color=false` flag', async () => {
    process.env = {TERM: 'xterm-256color',};
    process.argv = ['--color=false',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('support `--color=256` flag', async () => {
    process.argv = ['--color=256',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('level should be 2 if `--color=256` flag is used', async () => {
    process.argv = ['--color=256',];
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
    expect((result.stdout as ColorSupportObject).has256).toBeTruthy();
  });

  it('support `--color=16m` flag', async () => {
    process.argv = ['--color=16m',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('support `--color=full` flag', async () => {
    process.argv = ['--color=full',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('support `--color=truecolor` flag', async () => {
    process.argv = ['--color=truecolor',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('level should be 3 if `--color=16m` flag is used', async () => {
    process.argv = ['--color=16m',];
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(3);
    expect((result.stdout as ColorSupportObject).has256).toBeTruthy();
    expect((result.stdout as ColorSupportObject).has16m).toBeTruthy();
  });

  it('ignore post-terminator flags', async () => {
    process.argv = ['--color', '--', '--no-color',];
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('allow tests of the properties on false', async () => {
    process.env = {TERM: 'xterm-256color',};
    process.argv = ['--no-color',];
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).hasBasic).toBe(undefined);
    expect((result.stdout as ColorSupportObject).has256).toBe(undefined);
    expect((result.stdout as ColorSupportObject).has16m).toBe(undefined);
    expect((result.stdout as ColorSupportObject).level).toBeUndefined();
  });

  it('return false if `CI` is in env', async () => {
    process.env['CI'] = 'AppVeyor';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return true if `TRAVIS` is in env', async () => {
    process.env = { CI: 'Travis', TRAVIS: '1', };
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `CIRCLECI` is in env', async () => {
    process.env = { CI: true as any, CIRCLECI: true as any, };
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `APPVEYOR` is in env', async () => {
    process.env = { CI: true as any, APPVEYOR: true as any, };
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `GITLAB_CI` is in env', async () => {
    process.env = { CI: true as any, GITLAB_CI: true as any,};
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `BUILDKITE` is in env', async () => {
    process.env = { CI: true as any, BUILDKITE: true as any, };
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if `DRONE` is in env', async () => {
    process.env = { CI: true as any, DRONE: true as any, };
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
  });

  it('return true if Codeship is in env', async () => {
    process.env = { CI: true as any, CI_NAME: 'codeship', };
    const result = createNodeSupportsColor();
    expect(result).toBeTruthy();
  });

  it('return false if `TEAMCITY_VERSION` is in env and is < 9.1', async () => {
    process.env['TEAMCITY_VERSION'] = '9.0.5 (build 32523)';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return level 1 if `TEAMCITY_VERSION` is in env and is >= 9.1', async () => {
    process.env['TEAMCITY_VERSION'] = '9.1.0 (build 32523)';
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(1);
  });

  it('support rxvt', async () => {
    process.env = { TERM: 'rxvt', };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(1);
  });

  it('prefer level 2/xterm over COLORTERM', async () => {
    process.env = { COLORTERM: '1', TERM: 'xterm-256color', };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('support screen-256color', async () => {
    process.env = { TERM: 'screen-256color', };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('support putty-256color', async () => {
    process.env = { TERM: 'putty-256color', };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('level should be 3 when using iTerm 3.0', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
    });
    process.env = {
      TERM_PROGRAM: 'iTerm.app',
      TERM_PROGRAM_VERSION: '3.0.10',
    };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(3);
  });

  it('level should be 2 when using iTerm 2.9', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
    });
    process.env = {
      TERM_PROGRAM: 'iTerm.app',
      TERM_PROGRAM_VERSION: '2.9.3',
    };
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('return level 1 if on Windows earlier than 10 build 10586', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    Object.defineProperty(process.versions, 'node', {
      value: '8.0.0',
    });
    os.release = () => '10.0.10240';
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(1);
  });

  it('return level 2 if on Windows 10 build 10586 or later', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    Object.defineProperty(process.versions, 'node', {
      value: '8.0.0',
    });
    os.release = () => '10.0.10586';
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('return level 3 if on Windows 10 build 14931 or later', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    Object.defineProperty(process.versions, 'node', {
      value: '8.0.0',
    });
    os.release = () => '10.0.14931';
    const result = createNodeSupportsColor();
    expect((result.stdout as ColorSupportObject).level).toBe(3);
  });

  it('return level 2 when FORCE_COLOR is set when not TTY in xterm256', async () => {
    process.stdout.isTTY = false;
    process.env['FORCE_COLOR'] = true as any;
    process.env['TERM'] = 'xterm-256color';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);
  });

  it('supports setting a color level using FORCE_COLOR', async () => {
    let result: SupportsColor;
    process.env['FORCE_COLOR'] = '1';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(1);

    process.env['FORCE_COLOR'] = '2';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);

    process.env['FORCE_COLOR'] = '3';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(3);

    process.env['FORCE_COLOR'] = '0';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('FORCE_COLOR maxes out at a value of 3', async () => {
    process.env['FORCE_COLOR'] = '4';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(3);
  });

  it('FORCE_COLOR works when set via command line (all values are strings)', async () => {
    let result: SupportsColor;
    process.env['FORCE_COLOR'] = 'true';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(1);

    process.stdout.isTTY = false;
    process.env['FORCE_COLOR'] = 'true';
    process.env['TERM'] = 'xterm-256color';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);

    process.env['FORCE_COLOR'] = 'false';
    result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return false when `TERM` is set to dumb', async () => {
    process.env['TERM'] = 'dumb';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return false when `TERM` is set to dumb when `TERM_PROGRAM` is set', async () => {
    process.env['TERM'] = 'dumb';
    process.env['TERM_PROGRAM'] = 'Apple_Terminal';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return false when `TERM` is set to dumb when run on Windows', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    Object.defineProperty(process.versions, 'node', {
      value: '10.13.0',
    });
    os.release = () => '10.0.14931';
    process.env['TERM'] = 'dumb';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeFalsy();
  });

  it('return level 1 when `TERM` is set to dumb when `FORCE_COLOR` is set', async () => {
    process.env['FORCE_COLOR'] = '1';
    process.env['TERM'] = 'dumb';
    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(1);
  });

  it('ignore flags when sniffFlags=false', async () => {
    process.argv = ['--color=256',];
    process.env['TERM'] = 'dumb';

    const result = createNodeSupportsColor();
    expect(result.stdout).toBeTruthy();
    expect((result.stdout as ColorSupportObject).level).toBe(2);

    const sniffResult = result(process.stdout, {sniffFlags: true,});
    expect(sniffResult).toBeTruthy();
    expect((sniffResult as ColorSupportObject).level).toBe(2);

    const nosniffResult = result(process.stdout, {sniffFlags: false,});
    expect(nosniffResult).toBeFalsy();
  });
});