Array.prototype.getRandomValue = function () {
    return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.shuffle = function () {
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
}

Array.prototype.pushIfNotExists = function (value) {
	if (this.indexOf(value) == -1) {
		this.push(value);
	}
}