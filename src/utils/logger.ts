  class Logger extends console.Console {
    constructor(stdout = process.stdout, stderr = process.stderr) {
      super(stdout, stderr);
    }

    public log(message: string, ...optionalParams: any[]) {
      super.log(this.formatMessage("[LOG]", message), ...optionalParams);
    }

    public info(message: string, ...optionalParams: any[]) {
      super.info(this.formatMessage("[INFO]", message), ...optionalParams);
    }

    public warn(message: string, ...optionalParams: any[]) {
      super.warn(this.formatMessage("[WARN]", message), ...optionalParams);
    }

    public error(message: string, ...optionalParams: any[]) {
      super.error(this.formatMessage("[ERROR]", message), ...optionalParams);
    }

    private formatMessage(prefix: string, message: string): string {
      const colors = {
        reset: "\x1b[0m",
        fg: {
          green: "\x1b[32m",
          cyan: "\x1b[36m",
          yellow: "\x1b[33m",
          red: "\x1b[31m",
        },
      };

      const color =
        {
          "[LOG]": colors.fg.green,
          "[INFO]": colors.fg.cyan,
          "[WARN]": colors.fg.yellow,
          "[ERROR]": colors.fg.red,
        }[prefix] || colors.reset;

      return `${color}${this.getDate()} - ${prefix}:${colors.reset} ${message}`;
    }

    private getDate() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }

  const logger = new Logger();
  export default logger;
