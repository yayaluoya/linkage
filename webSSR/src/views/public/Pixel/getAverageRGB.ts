/**
 * 获取平均色
 * @param imgData 
 * @returns 
 */
export function getAverageRGB(imgData: any) {
    var red = 0;
    var green = 0;
    var blue = 0;
    var total = 0;

    for (var i = 0; i < imgData.length; i += 4) {
        if (imgData[i + 3] !== 0) {
            red += imgData[i + 0];
            green += imgData[i + 1];
            blue += imgData[i + 2];
            total++;
        }
    }

    var avgRed = Math.floor(red / total);
    var avgGreen = Math.floor(green / total);
    var avgBlue = Math.floor(blue / total);

    return 'rgba(' + avgRed + ',' + avgGreen + ',' + avgBlue + ', 1)';
};