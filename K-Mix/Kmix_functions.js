//Kmix.functions.js
//
function indexed_function(index, f)
{ 
	return function(value)
	{
		f[index] = value;
	};
}
