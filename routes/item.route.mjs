import { Router } from "express";
const router = Router();

const items = new Map();


router.use((request, response, next) => {
    console.log('Time ', Date.now());
    next();
})

router.get('/items', (request, response) => {
    response.send(Object.fromEntries(items));
});

router.get('/items/:id', (request, response) => {
    const item = items.get(request.params.id);
    if (item === undefined) {
        response.status(404);
        return response.send();
    }
    return response.send(item);
})

router.post('/items', (request, response) => {
    const { body } = request;
    const { name, data } = body;
    const { error, success } = validation(name, body);
    console.log(body);

    if (success !== true) {
        response.status(400);
        response.send({ error });
        return;
    } 

    items.set(name, data);
    response.status(200);
    response.send(Object.fromEntries(items));
});

router.put('/items/:id', (request, response) => {
    const { body } = request;
    const { name, data } = body;
    const { error, success } = validation(name, body);

    if (success !== true) {
        response.status(400);
        response.send({ error });
        return;
    } 

    items.set(name, data);
    response.status(200);
    response.send(items.get(name));
});


router.delete('/items/:id', (request, response) => {
    if (items.has(request.params.id)) {
        items.delete(request.params.id);
        response.status(201);
        response.send();
    } else {
        response.status(404);
        response.send();
    }
});

const validation = (name, data) => {
    if (typeof name !== 'string' || name.trim() === '') {
        return { error: `field 'name' must be String`, success: false };
    } 

    if (typeof data === 'undefined' || (typeof data === 'object' && Object.keys(data).length === 0)) {
       return { error: `field 'data' must be non empty`, success: false };
    }

    return { error: '', success: true }

}

export default router;