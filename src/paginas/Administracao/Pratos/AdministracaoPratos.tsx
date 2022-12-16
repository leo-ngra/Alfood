import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Button, Paper, TableContainer } from "@mui/material"

import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"


const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get('pratos/')
            .then(resposta => setPratos(resposta.data))

    }, [])

    const excluir = (pratoASerExcluido: IPrato) => {
        http.delete(`restaurantes/${pratoASerExcluido.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
                setPratos([...listaPrato])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target='_blank' rel='noreferrer'>Ver imagem</a>]
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() => excluir(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos