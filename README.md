# Gunsaw Level Editor+, a modded level editor for itch.io game [Gunsaw](https://orsonik.itch.io/gunsaw-demo)


Hello, all! 

Gunsaw recently allowed modding due to being discontinued, and released a new incomplete level editor alongside that.

As such, I have combined the best of both worlds and made a mod that hopes to fully give functionality to the level editor ^^

This is current in a very early state, and will have bugs. Join the [Discord server](https://discord.gg/d8xz6mBAab), and enter the [discussion thread](https://ptb.discord.com/channels/955738554129063947/1407174217895645195) to be a part of development!


<img width="787" height="795" alt="image" src="https://github.com/user-attachments/assets/164cf396-3e3f-486e-ae43-5dbd133be913" />

# Mod Contents:
## New Keybinds
- `Q` - Selects a `whiteTile`, or default tile to your cursor
- `Tab` - Selects the last used thing to your cursor. I.e. If you spawned in a baron enemy, you can press `Tab` to select a baron enemy again
- `Space` - Hold `Space` to enable multi-select. Drag to make a box, or individually select objects
- `Ctrl + C `- Copy
- `Ctrl + V` - Paste
- `- (minus)` - Decrease grid snap by 0.1
- `+ (plus)` - Increase grid snap by 0.1
- `Shift` - Toggles relative vs absolute scale and rotation. I.e. holding shift will make all multi-select objects rotate, whilst not holding shift will rotate all multi-select objects around the center point
- `Ctrl + Z` - Undo
- `Ctrl + Y` - Redo
- `Capslock` - Bypasses size restrictions for horizontal-locked objects (Asphalt, One-way platforms, Girders, Pipes). This will save and display when playing a level or loading it :)
- `G` - Select a ground point to show a line imitating in-game ground points

- ## New Features
- Clicking with Move (1) selected will not move it straight away -- you will need to click on it again to drag. This prevents accidentally clicking something and having it snap to a grid
- Multi-select. Rotate it, scale it, hold shift to toggle how (individually or large-scale)
- Copy multi-selections, paste it. You know the commands :)
- Undo/Redo features added. Limit of 150

## Known Bugs
- It might take a few seconds for menu buttons on your first load to be clickable. This is because I am very unoptimized and there's a lot of functions being loaded. Sorry about that. Please be a bit patient >.>
- Selecting > 100 objects at once will lag lower-end devices. Again, my apologies!
- Editing single items via the side menu will not update highlighting
- There is an intimidating white square at (-40, -2). Pay it no mind. It won't show in the level

## Planned Features
- Menu clarity on objects such as Weapon blocks giving weapon IDs
- Optimization
- Tile drawing (i.e. mouse over and drag, and a line of pixels of a certain size will be created beneath the cursor)

## Installation
1. Find your Gunsaw folder. 
- For itch.io app users, this is `~\AppData\Roaming\itch\apps\gunsaw-demo`
- For manual web download, this is wherever you extracted the .zip file into

2. Go to the `gunsaw-demo\Gunsaw_Data\Managed` folder, and replace Assembly-CSharp.dll with the latest download (Assembly-CSharp.dll on this github repository)

3. Open gunsaw and head to the editor to create with the new tools :)

### Current Version:
`1.0.1` Beta, thanks for testing!

### Example mod usage video: 
https://vimeo.com/1111155846?share=copy




