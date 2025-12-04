import Test from "../models/test.js"

const getAllProductsStatic = async (req, res)=>{
    const products = await Test.find({})
    res.status(200).json({ products, nbHits: products.length }) // nbhits is the number of results
}

const getAllProducts = async (req, res)=>{
    // To sort the results, pass sort=sort_parameter as query in the url (sort_parameter is what you want to sort on the basis of) ( to sort in opposite way, use -param) (we can add multiple params like sort=param1,param2 etc)
    const { company, featured, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if(company){
        queryObject.company = company
    }

    if(featured){
        queryObject.featured = featured === 'true'? true: false // converting string to boolean
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'} // regex makes sure that instead of searching letter-by-letter, you get results with give patterns (eg. searching abl will return table too)
    }

    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }

        const regEx = /\b(>|>=|=|<|<=)\b/g // this is regular expression ( not sure what it is )
        let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`) // replacing > < etc with character understood by mongoose
        // - is added to help separate field, operator and value

        const options = ['price', 'rating'] // the only properties where numericFilters is applicable
        filters = filters.split(',').forEach(item => { // splits different filters into an array
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value) }
            }
        });
    }

    let result = Test.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ') // This is done because in query, we pass multiple params by using , i.e. param1,param2 but in sort(), we pass them using space i.e. param1 param2 so we convert sort according to our need
        result = result.sort(sortList)
    }
    else{ // default case
        result = result.sort('createdAt')
    }

    if(fields){ // only gets the specified information
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

export {getAllProductsStatic, getAllProducts}