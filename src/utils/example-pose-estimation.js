let typesOfPart = ['nose',
'rightElbow', 'leftElbow',
'rightWrist', 'leftWrist',
'rightShoulder', 'leftShoulder',
'rightHip', 
'rightKnee', 'leftKnee', 
'rightAnkle', 'leftAnkle'
];

export default function estimateAction(pose, movement) {
    //console.log(pose);
    let points = null;

    points = pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position
    return acc
    }, {})

    let angles_arms = {'rightHigh':null, 'rightLow':null, 'leftHigh':null, 'leftLow':null}
    angles_arms.rightHigh = getAngle(points['rightShoulder'].x, points['rightShoulder'].y, points['rightElbow'].x, points['rightElbow'].y);
    angles_arms.rightLow = getAngle(points['rightElbow'].x, points['rightElbow'].y, points['rightWrist'].x, points['rightWrist'].y);
    angles_arms.leftHigh = getAngle(points['leftShoulder'].x, points['leftShoulder'].y, points['leftElbow'].x, points['leftElbow'].y);
    angles_arms.leftLow = getAngle(points['leftElbow'].x, points['leftElbow'].y, points['leftWrist'].x, points['leftWrist'].y);
    //console.log(an)

    let angles_nose = {'rightElbow':null, 'leftElbow':null}
    angles_nose.rightElbow = getAngle(points['nose'].x, points['nose'].y, points['rightElbow'].x, points['rightElbow'].y);
    angles_nose.leftElbow = getAngle(points['nose'].x, points['nose'].y, points['leftElbow'].x, points['leftElbow'].y);


    if(movement=='start'){
        if(checkBasicRight(angles_arms) && checkBasicLeft(angles_arms)){
            return true
        }
    }else if(movement=='stretch-right-side'){
        if(checkBasicLeft(angles_arms) && checkPassoverRight(angles_nose)){
            return true
        }
    }
    return false
}
function getAngle(x1, y1, x2, y2) {
	var rad = Math.atan2(y2 - y1, x2 - x1);
	return (rad*180)/Math.PI ;
}

function checkBasicRight(angles_arms){
    if (110 > angles_arms.rightHigh || angles_arms.rightHigh > 160){
        return false
    } else if (20 > angles_arms.rightLow || angles_arms.rightLow > 70){
        return false
    }else{
        return true
    }
}
function checkBasicLeft(angles_arms){
    if(20 > angles_arms.leftHigh || angles_arms.leftHigh > 70){
        return false
    }else if (110 > angles_arms.leftLow || angles_arms.leftLow > 160){
        return false
    }else{
        return true
    }
}

function checkPassoverRight(angles_nose){
    if( -110 > angles_nose.rightElbow || angles_nose.rightElbow > 0){
        return false
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
/*
{
    "nose": {
        "x": 236.46839350136506,
        "y": 445.8500763383576
    },
    "leftEye": {
        "x": 298.37043559867396,
        "y": 391.6638919568607
    },
    "rightEye": {
        "x": 210.35141015015603,
        "y": 371.6511722810551
    },
    "leftEar": {
        "x": 342.55755777106083,
        "y": 423.9033974629678
    },
    "rightEar": {
        "x": 171.04920290561623,
        "y": 383.79792465241684
    },
    "leftShoulder": {
        "x": 414.6123915269111,
        "y": 502.4310518451144
    },
    "rightShoulder": {
        "x": 179.63503071372855,
        "y": 485.2505055385915
    },
    "leftElbow": {
        "x": 193.71017575078002,
        "y": 483.08390722453225
    },
    "rightElbow": {
        "x": 178.42100051189547,
        "y": 486.4092852618244
    },
    "leftWrist": {
        "x": 201.69752766673167,
        "y": 490.2000328904626
    },
    "rightWrist": {
        "x": 178.80662843701248,
        "y": 495.6861011402027
    },
    "leftHip": {
        "x": 531.1272669656787,
        "y": 462.8074547654626
    },
    "rightHip": {
        "x": 178.6938895524571,
        "y": 483.3085369022869
    },
    "leftKnee": {
        "x": 179.9079045193058,
        "y": 482.9794495517152
    },
    "rightKnee": {
        "x": 190.21722040756632,
        "y": 481.8702187012734
    },
    "leftAnkle": {
        "x": 179.46177847113884,
        "y": 484.3598744477651
    },
    "rightAnkle": {
        "x": 178.4080812451248,
        "y": 484.4620785148129
    }
}
*/
