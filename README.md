# pong-ai

## Neural Network (design notes)

Inputs:
- x position of ball
- y position of ball
- x velocity of ball
- y velocity of ball
- y position of paddle

Output:
- up (should move the paddle up if > 0.5)
- down (should move the paddle down if > 0.5)


## Usage

After cloning the repository and executing `npm i` a dev-server can be started using
```
npm run serve
```

Tests can be ran by executing
```
npm run test
```

Or build a production-ready version: 
```
npm run build
```
