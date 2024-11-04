# Wicons

Wicons is a lightweight and customizable CSS tool that allows you to easily embed and style SVG icons using CSS variables. It provides an efficient way to select, customize, and integrate scalable icons into your web projects. With an intuitive interface, Wicons generates an optimized CSS file containing only the icons you select, embedded as Data URIs to enhance performance.

## Features

- **Customizable Icons**: Select from a variety of icons and generate a customized CSS file.
- **SVG Icons**: Icons are embedded as SVGs, ensuring scalability and crisp rendering.
- **Dark Mode Compatibility**: Built-in support for light and dark themes.
- **Optimized Performance**: Uses CSS variables and lightweight SVG definitions for better performance.
- **Simple Integration**: Easily include the generated CSS file in your project with minimal configuration.
- **Downloadable CSS**: Generate and download your custom CSS file with selected icons.

## Getting Started

### Installation

You have two options for using the wicons tool:

1. **Use the Web Interface**

   Visit [wipodev.com/wicons](https://wipodev.com/wicons) to access the icon selection interface. Choose the icons you need and generate a downloadable CSS file with only the selected icons. This is the recommended way to use the Wicons tool, as it keeps your CSS lean and optimized.

2. **Install via npm**

   If you prefer to generate the CSS using your own icons, you can install the full package using npm:

   ```bash
   # Install package globally
   npm install -g wicons

   # or you can install it in your project
   npm install wicons
   ```

   After installing, you can use the wicons command to generate CSS with your preferences.

3. **Using via npm**

   If you prefer to use all the available icons, you can install the full package using npm and then import the CSS file into your project:

   ```css
   @import "node_modules/wicons/dist/wicons.embed.all.min.css";
   ```

## Usage wicons tool

The `wicons` CLI tool offers multiple options to customize the number of icons and how they are referenced in the CSS. Below are the available options:

```bash
# If I install it globally use:
wicons [options]

# If you install it in your project use:
npx wicons [options]
```

### Options

- -p, --path <path>: Specifies the path to the folder containing your SVG icons.

  - Default: lib/svg in the current working directory.

- -m, --mode <mode>: Sets the execution mode.

  - Options: build (default) or dev.

- -o, --output <output>: Specifies the output folder for the generated CSS file.

  - Default: None (the CSS file will be generated in the current directory).

- -f, --filename <filename>: Sets the output file name for the CSS file.

  - Default: None (a default file name will be used).

- -e, --embed: If specified, embeds SVGs as Data URIs directly in the CSS.
  - Default: false.

### Example wicons tool

Generate a CSS file with default settings:

```bash
   wicons
```

Generate a CSS file with a specified path to your SVG icons folder:

```bash
   wicons --path ./my-icons/svg
```

Run in development mode:

```bash
   wicons --mode dev
```

Set a custom output directory and filename:

```bash
   wicons --output ./dist --filename icons.css
```

Embed SVG icons as Data URIs directly in the CSS:

```bash
   wicons --embed
```

Combine options as needed to customize the CSS generation fully. For example:

```bash
   wicons --path ./assets/svg --output ./public/css --filename custom-icons.css --embed
```

This flexibility allows you to control where and how your icons are generated for optimal performance and integration in your project.

## Use in your project

The Wicons tool offers two ways to use icons:

1. **Using CSS Classes**

   Add the base class `wi` to the element and specify an additional class for the desired icon.

   For example:

   ```html
   <i class="wi wi-loading"></i>
   ```

   ```warning
   This method sets the icon on the element. If you place text or other content inside the element, the element and icon will not be displayed
   ```

2. **Using `data-icon` Attribute**

   Alternatively, you can specify the icon using the data-icon attribute. This will add the icon to the ::before pseudo-element:

   ```html
   <i data-icon="loading"></i>
   ```

### Example in your project

Here’s an example of how to use the icons:

This will display the selected icons with the default styles. You can further customize them with your own CSS if needed.

```html
<i class="wi wi-loading"></i>

<i data-icon="loading"></i>
```

## Contributing

If you want to modify the tool or add new features, you can do so by creating a fork of the repository. Alternatively, you can clone the repository directly if you want to make direct modifications:

```bash
git clone https://github.com/wipodev/wicons.git
```

Pull requests are welcome for any improvements or new icon additions!

## Attribution

The icons used in this project are from [Font Awesome](https://fontawesome.com) and are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). Appropriate credit should be given as specified in the license.

## License

### Code License

The code in this project is licensed under the MIT License. - see the [LICENSE](https://github.com/wipodev/Wicons/blob/main/LICENCE) file for details.

### Icons License

The icons provided in this project are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially.

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
