let typesOfPart = ['nose',
'rightElbow', 'leftElbow',
'rightWrist', 'leftWrist',
'rightShoulder', 'leftShoulder',
'rightHip', 
'rightKnee', 'leftKnee', 
'rightAnkle', 'leftAnkle'
];

export default function estimateAction(pose, movement) {
  if(movement=='start'){
    console.log(pose);
  }
  return true
}

/*
[
    {
        "score": 0.8972646594047546,
        "part": "nose",
        "position": {
            "x": 193.2494088826053,
            "y": 371.1051601481289
        }
    },
    {
        "score": 0.8827599883079529,
        "part": "leftEye",
        "position": {
            "x": 213.5912971675117,
            "y": 327.83480257601354
        }
    },
    {
        "score": 0.5084783434867859,
        "part": "rightEye",
        "position": {
            "x": 189.11231839898596,
            "y": 330.69694281120064
        }
    },
    {
        "score": 0.8925256133079529,
        "part": "leftEar",
        "position": {
            "x": 331.31042194812795,
            "y": 351.28421014163206
        }
    },
    {
        "score": 0.062262799590826035,
        "part": "rightEar",
        "position": {
            "x": 341.2777276716069,
            "y": 351.3346421842516
        }
    },
    {
        "score": 0.2495066225528717,
        "part": "leftShoulder",
        "position": {
            "x": 252.49060001462558,
            "y": 465.1676499967516
        }
    },
    {
        "score": 0.6965226531028748,
        "part": "rightShoulder",
        "position": {
            "x": 255.96531908151326,
            "y": 460.3414314254158
        }
    },
    {
        "score": 0.043591927736997604,
        "part": "leftElbow",
        "position": {
            "x": 442.447926823323,
            "y": 362.2289074681653
        }
    },
    {
        "score": 0.01401884388178587,
        "part": "rightElbow",
        "position": {
            "x": 228.11628558892357,
            "y": 413.7108258348493
        }
    },
    {
        "score": 0.033359963446855545,
        "part": "leftWrist",
        "position": {
            "x": 459.15141136895477,
            "y": 405.90019368827967
        }
    },
    {
        "score": 0.02348148077726364,
        "part": "rightWrist",
        "position": {
            "x": 454.04711266575663,
            "y": 406.7909770497661
        }
    },
    {
        "score": 0.013632982969284058,
        "part": "leftHip",
        "position": {
            "x": 542.2502681357255,
            "y": 464.56788632081606
        }
    },
    {
        "score": 0.018321465700864792,
        "part": "rightHip",
        "position": {
            "x": 475.2468981571763,
            "y": 420.95659474077445
        }
    },
    {
        "score": 0.00958133116364479,
        "part": "leftKnee",
        "position": {
            "x": 506.6976343116225,
            "y": 482.03759461083683
        }
    },
    {
        "score": 0.018427671864628792,
        "part": "rightKnee",
        "position": {
            "x": 222.52338570105306,
            "y": 466.28726570621103
        }
    },
    {
        "score": 0.007404591888189316,
        "part": "leftAnkle",
        "position": {
            "x": 459.0058258580343,
            "y": 399.36409742073806
        }
    },
    {
        "score": 0.00852131750434637,
        "part": "rightAnkle",
        "position": {
            "x": 476.34969773790954,
            "y": 391.47699494867464
        }
    }
]
*/
